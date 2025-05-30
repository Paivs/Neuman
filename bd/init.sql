--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: enum_clients_client_type; Type: TYPE; Schema: public; Owner: neuman_user
--

CREATE TYPE public.enum_clients_client_type AS ENUM (
    'pf',
    'pj'
);


ALTER TYPE public.enum_clients_client_type OWNER TO neuman_user;

--
-- Name: enum_document_permissions_permission; Type: TYPE; Schema: public; Owner: neuman_user
--

CREATE TYPE public.enum_document_permissions_permission AS ENUM (
    'view',
    'edit',
    'comment'
);


ALTER TYPE public.enum_document_permissions_permission OWNER TO neuman_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: activity_logs; Type: TABLE; Schema: public; Owner: neuman_user
--

CREATE TABLE public.activity_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    action character varying(100) NOT NULL,
    document_id uuid,
    version_id uuid,
    comment_id uuid,
    description text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.activity_logs OWNER TO neuman_user;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: neuman_user
--

CREATE TABLE public.clients (
    id uuid NOT NULL,
    client_type public.enum_clients_client_type NOT NULL,
    user_id uuid NOT NULL,
    name character varying(255),
    cpf character varying(255),
    company_name character varying(255),
    cnpj character varying(255),
    phone character varying(255),
    case_code character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.clients OWNER TO neuman_user;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: neuman_user
--

CREATE TABLE public.comments (
    id uuid NOT NULL,
    document_id uuid NOT NULL,
    version_id uuid,
    author_id uuid,
    content text NOT NULL,
    created_at timestamp with time zone
);


ALTER TABLE public.comments OWNER TO neuman_user;

--
-- Name: document_permissions; Type: TABLE; Schema: public; Owner: neuman_user
--

CREATE TABLE public.document_permissions (
    id uuid NOT NULL,
    document_id uuid NOT NULL,
    user_id uuid NOT NULL,
    permission public.enum_document_permissions_permission NOT NULL,
    created_at timestamp with time zone
);


ALTER TABLE public.document_permissions OWNER TO neuman_user;

--
-- Name: document_versions; Type: TABLE; Schema: public; Owner: neuman_user
--

CREATE TABLE public.document_versions (
    id uuid NOT NULL,
    document_id uuid NOT NULL,
    version_number integer NOT NULL,
    file_url text NOT NULL,
    size bigint,
    type text,
    last_modified timestamp with time zone,
    uploaded_by uuid,
    created_at timestamp with time zone
);


ALTER TABLE public.document_versions OWNER TO neuman_user;

--
-- Name: documents; Type: TABLE; Schema: public; Owner: neuman_user
--

CREATE TABLE public.documents (
    id uuid NOT NULL,
    tenant_id uuid,
    owner_id uuid,
    title text NOT NULL,
    description text,
    current_version_id uuid,
    is_archived boolean DEFAULT false,
    created_at timestamp with time zone,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.documents OWNER TO neuman_user;

--
-- Name: tenant_users; Type: TABLE; Schema: public; Owner: neuman_user
--

CREATE TABLE public.tenant_users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tenant_id uuid,
    user_id uuid,
    role text DEFAULT 'owner'::text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.tenant_users OWNER TO neuman_user;

--
-- Name: tenants; Type: TABLE; Schema: public; Owner: neuman_user
--

CREATE TABLE public.tenants (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.tenants OWNER TO neuman_user;

--
-- Name: users; Type: TABLE; Schema: public; Owner: neuman_user
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO neuman_user;

--
-- Name: activity_logs activity_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_pkey PRIMARY KEY (id);


--
-- Name: clients clients_cnpj_key; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_cnpj_key UNIQUE (cnpj);


--
-- Name: clients clients_cpf_key; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_cpf_key UNIQUE (cpf);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: clients clients_user_id_key; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_user_id_key UNIQUE (user_id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: document_permissions document_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.document_permissions
    ADD CONSTRAINT document_permissions_pkey PRIMARY KEY (id);


--
-- Name: document_versions document_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.document_versions
    ADD CONSTRAINT document_versions_pkey PRIMARY KEY (id);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: tenant_users tenant_users_pkey; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.tenant_users
    ADD CONSTRAINT tenant_users_pkey PRIMARY KEY (id);


--
-- Name: tenant_users tenant_users_tenant_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.tenant_users
    ADD CONSTRAINT tenant_users_tenant_id_user_id_key UNIQUE (tenant_id, user_id);


--
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- Name: tenants tenants_slug_key; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_slug_key UNIQUE (slug);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_name_key; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_key UNIQUE (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: document_permissions_document_id_user_id; Type: INDEX; Schema: public; Owner: neuman_user
--

CREATE UNIQUE INDEX document_permissions_document_id_user_id ON public.document_permissions USING btree (document_id, user_id);


--
-- Name: clients clients_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comments comments_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: comments comments_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id) ON UPDATE CASCADE;


--
-- Name: comments comments_version_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_version_id_fkey FOREIGN KEY (version_id) REFERENCES public.document_versions(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: document_permissions document_permissions_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.document_permissions
    ADD CONSTRAINT document_permissions_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: document_permissions document_permissions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.document_permissions
    ADD CONSTRAINT document_permissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: document_versions document_versions_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.document_versions
    ADD CONSTRAINT document_versions_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: document_versions document_versions_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.document_versions
    ADD CONSTRAINT document_versions_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: documents documents_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: activity_logs fk_activity_comment; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT fk_activity_comment FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE SET NULL;


--
-- Name: activity_logs fk_activity_document; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT fk_activity_document FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE SET NULL;


--
-- Name: activity_logs fk_activity_user; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT fk_activity_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: activity_logs fk_activity_version; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT fk_activity_version FOREIGN KEY (version_id) REFERENCES public.document_versions(id) ON DELETE SET NULL;


--
-- Name: tenant_users tenant_users_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neuman_user
--

ALTER TABLE ONLY public.tenant_users
    ADD CONSTRAINT tenant_users_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

