-- EXTENSÕES & TYPES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

CREATE TYPE enum_clients_client_type AS ENUM ('pf', 'pj');
CREATE TYPE enum_document_permissions_permission AS ENUM ('view', 'edit', 'comment');


-- clients

CREATE TABLE users (
    id uuid NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL UNIQUE,
    email character varying(255) NOT NULL UNIQUE,
    password_hash character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE clients (
    id uuid NOT NULL PRIMARY KEY,
    client_type enum_clients_client_type NOT NULL,
    user_id uuid NOT NULL UNIQUE,
    name character varying(255),
    cpf character varying(255) UNIQUE,
    company_name character varying(255),
    cnpj character varying(255) UNIQUE,
    phone character varying(255),
    case_code character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    address text,
    CONSTRAINT clients_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

--tenent

CREATE TABLE tenants (
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    name text NOT NULL,
    slug text NOT NULL UNIQUE,
    created_at timestamp without time zone DEFAULT now()
);

CREATE TABLE tenant_users (
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    tenant_id uuid,
    user_id uuid,
    role text DEFAULT 'owner'::text,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT tenant_users_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
    CONSTRAINT tenant_users_tenant_id_user_id_key UNIQUE (tenant_id, user_id)
);

-- cases

CREATE TABLE cases (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE case_clients (
    case_id uuid NOT NULL,
    client_id uuid NOT NULL,
    PRIMARY KEY (case_id, client_id),
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);


-- group_documents

CREATE TABLE group_documents (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id uuid NOT NULL,
    case_id uuid,
    title text NOT NULL,
    description text,
    is_archived boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id),
    FOREIGN KEY (case_id) REFERENCES cases(id)
);

CREATE TABLE group_document_clients (
    group_document_id uuid NOT NULL,
    client_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (group_document_id, client_id),
    FOREIGN KEY (group_document_id) REFERENCES group_documents(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE group_document_permissions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_document_id uuid NOT NULL,
    user_id uuid NOT NULL,
    permission enum_document_permissions_permission NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    FOREIGN KEY (group_document_id) REFERENCES group_documents(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- documents

CREATE TABLE documents (
    id uuid NOT NULL PRIMARY KEY,
    tenant_id uuid,
    owner_id uuid,
    title text NOT NULL,
    description text,
    current_version_id uuid,
    is_archived boolean DEFAULT false,
    created_at timestamp with time zone,
    updated_at timestamp with time zone DEFAULT now(),
    group_document_id uuid,
    CONSTRAINT documents_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT documents_group_document_id_fkey FOREIGN KEY (group_document_id) REFERENCES group_documents(id) ON DELETE SET NULL
);

CREATE TABLE document_versions (
    id uuid NOT NULL PRIMARY KEY,
    document_id uuid NOT NULL,
    version_number integer NOT NULL,
    file_url text NOT NULL,
    size bigint,
    type text,
    last_modified timestamp with time zone,
    uploaded_by uuid,
    created_at timestamp with time zone,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT document_versions_document_id_fkey FOREIGN KEY (document_id) REFERENCES documents(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT document_versions_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE document_permissions (
    id uuid NOT NULL PRIMARY KEY,
    document_id uuid NOT NULL,
    user_id uuid NOT NULL,
    permission enum_document_permissions_permission NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT document_permissions_document_id_fkey FOREIGN KEY (document_id) REFERENCES documents(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT document_permissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE UNIQUE INDEX document_permissions_document_id_user_id ON document_permissions USING btree (document_id, user_id);


-- comments

CREATE TABLE comment_documents (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id uuid NOT NULL,
    version_id uuid,
    author_id uuid,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT comment_documents_document_id_fkey FOREIGN KEY (document_id) REFERENCES documents(id) ON UPDATE CASCADE,
    CONSTRAINT comment_documents_version_id_fkey FOREIGN KEY (version_id) REFERENCES document_versions(id) ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT comment_documents_author_id_fkey FOREIGN KEY (author_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE comment_group_documents (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_document_id uuid NOT NULL,
    author_id uuid,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT comment_group_documents_group_document_id_fkey FOREIGN KEY (group_document_id) REFERENCES group_documents(id) ON UPDATE CASCADE,
    CONSTRAINT comment_group_documents_author_id_fkey FOREIGN KEY (author_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL
);

-- logs

CREATE TABLE activity_logs (
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL,
    action character varying(100) NOT NULL,
    document_id uuid,
    group_document_id uuid,
    version_id uuid,
    comment_document_id uuid,
    comment_group_document_id uuid,
    description text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT fk_activity_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_activity_document FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE SET NULL,
    CONSTRAINT fk_activity_group_document FOREIGN KEY (group_document_id) REFERENCES group_documents(id) ON DELETE SET NULL,
    CONSTRAINT fk_activity_version FOREIGN KEY (version_id) REFERENCES document_versions(id) ON DELETE SET NULL,
    CONSTRAINT fk_activity_comment_document FOREIGN KEY (comment_document_id) REFERENCES comment_documents(id) ON DELETE SET NULL,
    CONSTRAINT fk_activity_comment_group_document FOREIGN KEY (comment_group_document_id) REFERENCES comment_group_documents(id) ON DELETE SET NULL
);
