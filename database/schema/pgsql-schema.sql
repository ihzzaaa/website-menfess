--
-- PostgreSQL database dump
--

\restrict VhyCOecskJrkmoYMAyjZT8SWHmvURfX5FQzwUFIRGuVAjo7Dj90mfPnBzHThOzP

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admins (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    avatar character varying(255)
);


--
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admins_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- Name: alias_pool; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alias_pool (
    id bigint NOT NULL,
    adjective character varying(255) NOT NULL,
    noun character varying(255) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: alias_pool_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.alias_pool_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: alias_pool_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.alias_pool_id_seq OWNED BY public.alias_pool.id;


--
-- Name: cache; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);


--
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    icon character varying(255),
    description text,
    parent_id bigint,
    sort_order integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: daily_polls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.daily_polls (
    id bigint NOT NULL,
    question character varying(255) NOT NULL,
    starts_at timestamp(0) without time zone NOT NULL,
    ends_at timestamp(0) without time zone NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    result_sent boolean DEFAULT false NOT NULL,
    total_votes integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: daily_polls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.daily_polls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: daily_polls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.daily_polls_id_seq OWNED BY public.daily_polls.id;


--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: job_batches; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: menfess_aliases; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menfess_aliases (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    menfess_post_id bigint NOT NULL,
    alias_name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


--
-- Name: menfess_aliases_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.menfess_aliases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: menfess_aliases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.menfess_aliases_id_seq OWNED BY public.menfess_aliases.id;


--
-- Name: menfess_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menfess_comments (
    id bigint NOT NULL,
    menfess_post_id bigint NOT NULL,
    user_id bigint NOT NULL,
    parent_id bigint,
    content text NOT NULL,
    upvote_count integer DEFAULT 0 NOT NULL,
    downvote_count integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT menfess_comments_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'hidden'::character varying, 'deleted'::character varying])::text[])))
);


--
-- Name: menfess_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.menfess_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: menfess_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.menfess_comments_id_seq OWNED BY public.menfess_comments.id;


--
-- Name: menfess_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menfess_posts (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    content text NOT NULL,
    media_path character varying(255),
    media_type character varying(255),
    is_pinned boolean DEFAULT false NOT NULL,
    pinned_until timestamp(0) without time zone,
    is_sponsored boolean DEFAULT false NOT NULL,
    is_repost boolean DEFAULT false NOT NULL,
    original_post_id bigint,
    repost_comment text,
    upvote_count integer DEFAULT 0 NOT NULL,
    downvote_count integer DEFAULT 0 NOT NULL,
    comment_count integer DEFAULT 0 NOT NULL,
    share_count integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT menfess_posts_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'hidden'::character varying, 'deleted'::character varying])::text[])))
);


--
-- Name: menfess_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.menfess_posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: menfess_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.menfess_posts_id_seq OWNED BY public.menfess_posts.id;


--
-- Name: menfess_shares; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menfess_shares (
    id bigint NOT NULL,
    menfess_post_id bigint NOT NULL,
    share_token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


--
-- Name: menfess_shares_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.menfess_shares_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: menfess_shares_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.menfess_shares_id_seq OWNED BY public.menfess_shares.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id uuid NOT NULL,
    user_id bigint NOT NULL,
    type character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    data jsonb,
    is_read boolean DEFAULT false NOT NULL,
    read_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


--
-- Name: payment_methods; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_methods (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    account_number character varying(255),
    account_name character varying(255),
    icon character varying(255),
    instructions text,
    is_active boolean DEFAULT true NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: payment_methods_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payment_methods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment_methods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payment_methods_id_seq OWNED BY public.payment_methods.id;


--
-- Name: point_transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.point_transactions (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    amount integer NOT NULL,
    type character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    reference_type character varying(255),
    reference_id bigint,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT point_transactions_type_check CHECK (((type)::text = ANY ((ARRAY['earned'::character varying, 'spent'::character varying])::text[])))
);


--
-- Name: point_transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.point_transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: point_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.point_transactions_id_seq OWNED BY public.point_transactions.id;


--
-- Name: poll_options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.poll_options (
    id bigint NOT NULL,
    daily_poll_id bigint NOT NULL,
    label character varying(255) NOT NULL,
    vote_count integer DEFAULT 0 NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: poll_options_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.poll_options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: poll_options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.poll_options_id_seq OWNED BY public.poll_options.id;


--
-- Name: poll_votes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.poll_votes (
    id bigint NOT NULL,
    daily_poll_id bigint NOT NULL,
    poll_option_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp(0) without time zone
);


--
-- Name: poll_votes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.poll_votes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: poll_votes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.poll_votes_id_seq OWNED BY public.poll_votes.id;


--
-- Name: product_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_images (
    id bigint NOT NULL,
    product_id bigint NOT NULL,
    image_path character varying(255) NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: product_images_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_images_id_seq OWNED BY public.product_images.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    category_id bigint NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    description text NOT NULL,
    price numeric(12,2) NOT NULL,
    condition character varying(255) DEFAULT 'used'::character varying NOT NULL,
    whatsapp_number character varying(255),
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    is_promoted boolean DEFAULT false NOT NULL,
    promoted_until timestamp(0) without time zone,
    is_paid boolean DEFAULT false NOT NULL,
    view_count integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    deleted_at timestamp(0) without time zone,
    CONSTRAINT products_condition_check CHECK (((condition)::text = ANY ((ARRAY['new'::character varying, 'used'::character varying, 'like_new'::character varying])::text[]))),
    CONSTRAINT products_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'active'::character varying, 'sold'::character varying, 'hidden'::character varying, 'rejected'::character varying])::text[])))
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reports (
    id bigint NOT NULL,
    reporter_id bigint NOT NULL,
    reportable_type character varying(255) NOT NULL,
    reportable_id bigint NOT NULL,
    reason character varying(255) NOT NULL,
    description text,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    reviewed_by bigint,
    reviewed_at timestamp(0) without time zone,
    admin_notes text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT reports_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'reviewing'::character varying, 'resolved'::character varying, 'dismissed'::character varying])::text[])))
);


--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


--
-- Name: settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.settings (
    id bigint NOT NULL,
    key character varying(255) NOT NULL,
    value text,
    "group" character varying(255) DEFAULT 'general'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: settings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.settings_id_seq OWNED BY public.settings.id;


--
-- Name: songfess_analytics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.songfess_analytics (
    id bigint NOT NULL,
    song_title character varying(255) NOT NULL,
    artist_name character varying(255) NOT NULL,
    album_art character varying(255),
    play_count integer DEFAULT 0 NOT NULL,
    last_requested_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: songfess_analytics_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.songfess_analytics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: songfess_analytics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.songfess_analytics_id_seq OWNED BY public.songfess_analytics.id;


--
-- Name: songfess_filters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.songfess_filters (
    id bigint NOT NULL,
    pattern character varying(255) NOT NULL,
    reason character varying(255),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: songfess_filters_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.songfess_filters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: songfess_filters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.songfess_filters_id_seq OWNED BY public.songfess_filters.id;


--
-- Name: songfess_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.songfess_messages (
    id bigint NOT NULL,
    user_id bigint,
    sender_name character varying(255),
    recipient_name character varying(255) NOT NULL,
    song_title character varying(255) NOT NULL,
    artist_name character varying(255),
    album_art character varying(255),
    message text NOT NULL,
    is_anonymous boolean DEFAULT false NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT songfess_messages_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[])))
);


--
-- Name: songfess_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.songfess_messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: songfess_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.songfess_messages_id_seq OWNED BY public.songfess_messages.id;


--
-- Name: sponsors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sponsors (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    image_path character varying(255) NOT NULL,
    url character varying(255),
    is_active boolean DEFAULT true NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    starts_at timestamp(0) without time zone,
    ends_at timestamp(0) without time zone,
    click_count integer DEFAULT 0 NOT NULL,
    view_count integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: sponsors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sponsors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sponsors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sponsors_id_seq OWNED BY public.sponsors.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transactions (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    type character varying(255) NOT NULL,
    amount numeric(12,2) NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    payment_method_id bigint,
    payment_proof character varying(255),
    reference_type character varying(255),
    reference_id bigint,
    admin_notes text,
    confirmed_by bigint,
    confirmed_at timestamp(0) without time zone,
    paid_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT transactions_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'waiting_confirmation'::character varying, 'paid'::character varying, 'failed'::character varying, 'refunded'::character varying])::text[]))),
    CONSTRAINT transactions_type_check CHECK (((type)::text = ANY ((ARRAY['pinned_menfess'::character varying, 'promoted_product'::character varying, 'upload_product'::character varying, 'sponsor'::character varying])::text[])))
);


--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    username character varying(255),
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255),
    avatar character varying(255),
    phone character varying(255),
    whatsapp_number character varying(255),
    whatsapp_verified_at timestamp(0) without time zone,
    google_id character varying(255),
    bio text,
    is_verified_seller boolean DEFAULT false NOT NULL,
    is_shadow_banned boolean DEFAULT false NOT NULL,
    privacy_settings jsonb,
    points integer DEFAULT 0 NOT NULL,
    role character varying(255) DEFAULT 'user'::character varying NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    is_blocked boolean DEFAULT false NOT NULL,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['user'::character varying, 'admin'::character varying, 'moderator'::character varying])::text[])))
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: votes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.votes (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    voteable_type character varying(255) NOT NULL,
    voteable_id bigint NOT NULL,
    vote_type character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT votes_vote_type_check CHECK (((vote_type)::text = ANY ((ARRAY['up'::character varying, 'down'::character varying])::text[])))
);


--
-- Name: votes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.votes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: votes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.votes_id_seq OWNED BY public.votes.id;


--
-- Name: whatsapp_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.whatsapp_logs (
    id bigint NOT NULL,
    user_id bigint,
    type character varying(255) NOT NULL,
    phone_number character varying(255) NOT NULL,
    message text NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    gateway_response text,
    sent_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT whatsapp_logs_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'sent'::character varying, 'failed'::character varying])::text[]))),
    CONSTRAINT whatsapp_logs_type_check CHECK (((type)::text = ANY ((ARRAY['poll_result'::character varying, 'trending'::character varying, 'personal'::character varying, 'verification'::character varying, 'broadcast'::character varying])::text[])))
);


--
-- Name: whatsapp_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.whatsapp_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: whatsapp_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.whatsapp_logs_id_seq OWNED BY public.whatsapp_logs.id;


--
-- Name: whatsapp_verifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.whatsapp_verifications (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    phone_number character varying(255) NOT NULL,
    otp_code character varying(255) NOT NULL,
    expires_at timestamp(0) without time zone NOT NULL,
    verified_at timestamp(0) without time zone,
    attempts integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: whatsapp_verifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.whatsapp_verifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: whatsapp_verifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.whatsapp_verifications_id_seq OWNED BY public.whatsapp_verifications.id;


--
-- Name: word_filters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.word_filters (
    id bigint NOT NULL,
    word character varying(255) NOT NULL,
    replacement character varying(255) DEFAULT '***'::character varying NOT NULL,
    severity character varying(255) DEFAULT 'warn'::character varying NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT word_filters_severity_check CHECK (((severity)::text = ANY ((ARRAY['warn'::character varying, 'block'::character varying])::text[])))
);


--
-- Name: word_filters_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.word_filters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: word_filters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.word_filters_id_seq OWNED BY public.word_filters.id;


--
-- Name: admins id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- Name: alias_pool id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alias_pool ALTER COLUMN id SET DEFAULT nextval('public.alias_pool_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: daily_polls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.daily_polls ALTER COLUMN id SET DEFAULT nextval('public.daily_polls_id_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: menfess_aliases id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_aliases ALTER COLUMN id SET DEFAULT nextval('public.menfess_aliases_id_seq'::regclass);


--
-- Name: menfess_comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_comments ALTER COLUMN id SET DEFAULT nextval('public.menfess_comments_id_seq'::regclass);


--
-- Name: menfess_posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_posts ALTER COLUMN id SET DEFAULT nextval('public.menfess_posts_id_seq'::regclass);


--
-- Name: menfess_shares id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_shares ALTER COLUMN id SET DEFAULT nextval('public.menfess_shares_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: payment_methods id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_methods ALTER COLUMN id SET DEFAULT nextval('public.payment_methods_id_seq'::regclass);


--
-- Name: point_transactions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.point_transactions ALTER COLUMN id SET DEFAULT nextval('public.point_transactions_id_seq'::regclass);


--
-- Name: poll_options id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.poll_options ALTER COLUMN id SET DEFAULT nextval('public.poll_options_id_seq'::regclass);


--
-- Name: poll_votes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.poll_votes ALTER COLUMN id SET DEFAULT nextval('public.poll_votes_id_seq'::regclass);


--
-- Name: product_images id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_images ALTER COLUMN id SET DEFAULT nextval('public.product_images_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- Name: settings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.settings ALTER COLUMN id SET DEFAULT nextval('public.settings_id_seq'::regclass);


--
-- Name: songfess_analytics id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songfess_analytics ALTER COLUMN id SET DEFAULT nextval('public.songfess_analytics_id_seq'::regclass);


--
-- Name: songfess_filters id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songfess_filters ALTER COLUMN id SET DEFAULT nextval('public.songfess_filters_id_seq'::regclass);


--
-- Name: songfess_messages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songfess_messages ALTER COLUMN id SET DEFAULT nextval('public.songfess_messages_id_seq'::regclass);


--
-- Name: sponsors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sponsors ALTER COLUMN id SET DEFAULT nextval('public.sponsors_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: votes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes ALTER COLUMN id SET DEFAULT nextval('public.votes_id_seq'::regclass);


--
-- Name: whatsapp_logs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.whatsapp_logs ALTER COLUMN id SET DEFAULT nextval('public.whatsapp_logs_id_seq'::regclass);


--
-- Name: whatsapp_verifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.whatsapp_verifications ALTER COLUMN id SET DEFAULT nextval('public.whatsapp_verifications_id_seq'::regclass);


--
-- Name: word_filters id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.word_filters ALTER COLUMN id SET DEFAULT nextval('public.word_filters_id_seq'::regclass);


--
-- Name: admins admins_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_unique UNIQUE (email);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: alias_pool alias_pool_adjective_noun_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alias_pool
    ADD CONSTRAINT alias_pool_adjective_noun_unique UNIQUE (adjective, noun);


--
-- Name: alias_pool alias_pool_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alias_pool
    ADD CONSTRAINT alias_pool_pkey PRIMARY KEY (id);


--
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: categories categories_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_unique UNIQUE (slug);


--
-- Name: daily_polls daily_polls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.daily_polls
    ADD CONSTRAINT daily_polls_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: menfess_aliases menfess_aliases_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_aliases
    ADD CONSTRAINT menfess_aliases_pkey PRIMARY KEY (id);


--
-- Name: menfess_aliases menfess_aliases_user_id_menfess_post_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_aliases
    ADD CONSTRAINT menfess_aliases_user_id_menfess_post_id_unique UNIQUE (user_id, menfess_post_id);


--
-- Name: menfess_comments menfess_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_comments
    ADD CONSTRAINT menfess_comments_pkey PRIMARY KEY (id);


--
-- Name: menfess_posts menfess_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_posts
    ADD CONSTRAINT menfess_posts_pkey PRIMARY KEY (id);


--
-- Name: menfess_shares menfess_shares_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_shares
    ADD CONSTRAINT menfess_shares_pkey PRIMARY KEY (id);


--
-- Name: menfess_shares menfess_shares_share_token_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_shares
    ADD CONSTRAINT menfess_shares_share_token_unique UNIQUE (share_token);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- Name: payment_methods payment_methods_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_methods
    ADD CONSTRAINT payment_methods_pkey PRIMARY KEY (id);


--
-- Name: point_transactions point_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.point_transactions
    ADD CONSTRAINT point_transactions_pkey PRIMARY KEY (id);


--
-- Name: poll_options poll_options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.poll_options
    ADD CONSTRAINT poll_options_pkey PRIMARY KEY (id);


--
-- Name: poll_votes poll_votes_daily_poll_id_user_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.poll_votes
    ADD CONSTRAINT poll_votes_daily_poll_id_user_id_unique UNIQUE (daily_poll_id, user_id);


--
-- Name: poll_votes poll_votes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.poll_votes
    ADD CONSTRAINT poll_votes_pkey PRIMARY KEY (id);


--
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products products_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_slug_unique UNIQUE (slug);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: settings settings_key_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_key_unique UNIQUE (key);


--
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);


--
-- Name: songfess_analytics songfess_analytics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songfess_analytics
    ADD CONSTRAINT songfess_analytics_pkey PRIMARY KEY (id);


--
-- Name: songfess_filters songfess_filters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songfess_filters
    ADD CONSTRAINT songfess_filters_pkey PRIMARY KEY (id);


--
-- Name: songfess_messages songfess_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songfess_messages
    ADD CONSTRAINT songfess_messages_pkey PRIMARY KEY (id);


--
-- Name: sponsors sponsors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sponsors
    ADD CONSTRAINT sponsors_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_google_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_google_id_unique UNIQUE (google_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--
-- Name: votes votes_user_id_voteable_type_voteable_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_user_id_voteable_type_voteable_id_unique UNIQUE (user_id, voteable_type, voteable_id);


--
-- Name: whatsapp_logs whatsapp_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.whatsapp_logs
    ADD CONSTRAINT whatsapp_logs_pkey PRIMARY KEY (id);


--
-- Name: whatsapp_verifications whatsapp_verifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.whatsapp_verifications
    ADD CONSTRAINT whatsapp_verifications_pkey PRIMARY KEY (id);


--
-- Name: word_filters word_filters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.word_filters
    ADD CONSTRAINT word_filters_pkey PRIMARY KEY (id);


--
-- Name: cache_expiration_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cache_expiration_index ON public.cache USING btree (expiration);


--
-- Name: cache_locks_expiration_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cache_locks_expiration_index ON public.cache_locks USING btree (expiration);


--
-- Name: categories_parent_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_parent_id_index ON public.categories USING btree (parent_id);


--
-- Name: categories_sort_order_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_sort_order_index ON public.categories USING btree (sort_order);


--
-- Name: daily_polls_is_active_starts_at_ends_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX daily_polls_is_active_starts_at_ends_at_index ON public.daily_polls USING btree (is_active, starts_at, ends_at);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- Name: menfess_aliases_menfess_post_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menfess_aliases_menfess_post_id_index ON public.menfess_aliases USING btree (menfess_post_id);


--
-- Name: menfess_comments_menfess_post_id_created_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menfess_comments_menfess_post_id_created_at_index ON public.menfess_comments USING btree (menfess_post_id, created_at);


--
-- Name: menfess_comments_parent_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menfess_comments_parent_id_index ON public.menfess_comments USING btree (parent_id);


--
-- Name: menfess_comments_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menfess_comments_user_id_index ON public.menfess_comments USING btree (user_id);


--
-- Name: menfess_posts_status_is_visible_created_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menfess_posts_status_is_visible_created_at_index ON public.menfess_posts USING btree (status, is_visible, created_at);


--
-- Name: menfess_posts_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menfess_posts_user_id_index ON public.menfess_posts USING btree (user_id);


--
-- Name: menfess_shares_menfess_post_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX menfess_shares_menfess_post_id_index ON public.menfess_shares USING btree (menfess_post_id);


--
-- Name: notifications_user_id_is_read_created_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX notifications_user_id_is_read_created_at_index ON public.notifications USING btree (user_id, is_read, created_at);


--
-- Name: point_transactions_reference_type_reference_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX point_transactions_reference_type_reference_id_index ON public.point_transactions USING btree (reference_type, reference_id);


--
-- Name: point_transactions_user_id_created_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX point_transactions_user_id_created_at_index ON public.point_transactions USING btree (user_id, created_at);


--
-- Name: poll_options_daily_poll_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX poll_options_daily_poll_id_index ON public.poll_options USING btree (daily_poll_id);


--
-- Name: poll_votes_poll_option_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX poll_votes_poll_option_id_index ON public.poll_votes USING btree (poll_option_id);


--
-- Name: product_images_product_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX product_images_product_id_index ON public.product_images USING btree (product_id);


--
-- Name: products_category_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_category_id_index ON public.products USING btree (category_id);


--
-- Name: products_slug_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_slug_index ON public.products USING btree (slug);


--
-- Name: products_status_created_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_status_created_at_index ON public.products USING btree (status, created_at);


--
-- Name: products_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_user_id_index ON public.products USING btree (user_id);


--
-- Name: reports_reportable_type_reportable_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reports_reportable_type_reportable_id_index ON public.reports USING btree (reportable_type, reportable_id);


--
-- Name: reports_reporter_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reports_reporter_id_index ON public.reports USING btree (reporter_id);


--
-- Name: reports_status_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reports_status_index ON public.reports USING btree (status);


--
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- Name: settings_group_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX settings_group_index ON public.settings USING btree ("group");


--
-- Name: sponsors_is_active_starts_at_ends_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sponsors_is_active_starts_at_ends_at_index ON public.sponsors USING btree (is_active, starts_at, ends_at);


--
-- Name: transactions_reference_type_reference_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transactions_reference_type_reference_id_index ON public.transactions USING btree (reference_type, reference_id);


--
-- Name: transactions_type_status_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transactions_type_status_index ON public.transactions USING btree (type, status);


--
-- Name: transactions_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX transactions_user_id_index ON public.transactions USING btree (user_id);


--
-- Name: votes_voteable_type_voteable_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX votes_voteable_type_voteable_id_index ON public.votes USING btree (voteable_type, voteable_id);


--
-- Name: whatsapp_logs_created_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX whatsapp_logs_created_at_index ON public.whatsapp_logs USING btree (created_at);


--
-- Name: whatsapp_logs_type_status_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX whatsapp_logs_type_status_index ON public.whatsapp_logs USING btree (type, status);


--
-- Name: whatsapp_logs_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX whatsapp_logs_user_id_index ON public.whatsapp_logs USING btree (user_id);


--
-- Name: whatsapp_verifications_phone_number_otp_code_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX whatsapp_verifications_phone_number_otp_code_index ON public.whatsapp_verifications USING btree (phone_number, otp_code);


--
-- Name: whatsapp_verifications_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX whatsapp_verifications_user_id_index ON public.whatsapp_verifications USING btree (user_id);


--
-- Name: word_filters_is_active_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX word_filters_is_active_index ON public.word_filters USING btree (is_active);


--
-- Name: categories categories_parent_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_id_foreign FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: menfess_aliases menfess_aliases_menfess_post_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_aliases
    ADD CONSTRAINT menfess_aliases_menfess_post_id_foreign FOREIGN KEY (menfess_post_id) REFERENCES public.menfess_posts(id) ON DELETE CASCADE;


--
-- Name: menfess_aliases menfess_aliases_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_aliases
    ADD CONSTRAINT menfess_aliases_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: menfess_comments menfess_comments_menfess_post_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_comments
    ADD CONSTRAINT menfess_comments_menfess_post_id_foreign FOREIGN KEY (menfess_post_id) REFERENCES public.menfess_posts(id) ON DELETE CASCADE;


--
-- Name: menfess_comments menfess_comments_parent_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_comments
    ADD CONSTRAINT menfess_comments_parent_id_foreign FOREIGN KEY (parent_id) REFERENCES public.menfess_comments(id) ON DELETE CASCADE;


--
-- Name: menfess_comments menfess_comments_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_comments
    ADD CONSTRAINT menfess_comments_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: menfess_posts menfess_posts_original_post_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_posts
    ADD CONSTRAINT menfess_posts_original_post_id_foreign FOREIGN KEY (original_post_id) REFERENCES public.menfess_posts(id) ON DELETE SET NULL;


--
-- Name: menfess_posts menfess_posts_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_posts
    ADD CONSTRAINT menfess_posts_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: menfess_shares menfess_shares_menfess_post_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menfess_shares
    ADD CONSTRAINT menfess_shares_menfess_post_id_foreign FOREIGN KEY (menfess_post_id) REFERENCES public.menfess_posts(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: point_transactions point_transactions_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.point_transactions
    ADD CONSTRAINT point_transactions_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: poll_options poll_options_daily_poll_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.poll_options
    ADD CONSTRAINT poll_options_daily_poll_id_foreign FOREIGN KEY (daily_poll_id) REFERENCES public.daily_polls(id) ON DELETE CASCADE;


--
-- Name: poll_votes poll_votes_daily_poll_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.poll_votes
    ADD CONSTRAINT poll_votes_daily_poll_id_foreign FOREIGN KEY (daily_poll_id) REFERENCES public.daily_polls(id) ON DELETE CASCADE;


--
-- Name: poll_votes poll_votes_poll_option_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.poll_votes
    ADD CONSTRAINT poll_votes_poll_option_id_foreign FOREIGN KEY (poll_option_id) REFERENCES public.poll_options(id) ON DELETE CASCADE;


--
-- Name: poll_votes poll_votes_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.poll_votes
    ADD CONSTRAINT poll_votes_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: product_images product_images_product_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_foreign FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_foreign FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE RESTRICT;


--
-- Name: products products_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: reports reports_reporter_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_reporter_id_foreign FOREIGN KEY (reporter_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: reports reports_reviewed_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_reviewed_by_foreign FOREIGN KEY (reviewed_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: songfess_messages songfess_messages_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songfess_messages
    ADD CONSTRAINT songfess_messages_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: transactions transactions_confirmed_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_confirmed_by_foreign FOREIGN KEY (confirmed_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: transactions transactions_payment_method_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_payment_method_id_foreign FOREIGN KEY (payment_method_id) REFERENCES public.payment_methods(id) ON DELETE SET NULL;


--
-- Name: transactions transactions_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: votes votes_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: whatsapp_logs whatsapp_logs_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.whatsapp_logs
    ADD CONSTRAINT whatsapp_logs_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: whatsapp_verifications whatsapp_verifications_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.whatsapp_verifications
    ADD CONSTRAINT whatsapp_verifications_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict VhyCOecskJrkmoYMAyjZT8SWHmvURfX5FQzwUFIRGuVAjo7Dj90mfPnBzHThOzP

--
-- PostgreSQL database dump
--

\restrict UIVwp53IH06S7DZu2hZXBw6Bx4A5gCbugWBxWbFLWIImDm7zBZdhFdzYrhSAoj8

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2026_04_16_000001_create_menfess_posts_table	1
5	2026_04_16_000002_create_menfess_comments_table	1
6	2026_04_16_000003_create_alias_pool_table	1
7	2026_04_16_000004_create_menfess_aliases_table	1
8	2026_04_16_000005_create_votes_table	1
9	2026_04_16_000006_create_menfess_shares_table	1
10	2026_04_16_000007_create_categories_table	1
11	2026_04_16_000008_create_products_table	1
12	2026_04_16_000009_create_product_images_table	1
13	2026_04_16_000010_create_daily_polls_table	1
14	2026_04_16_000011_create_poll_options_table	1
15	2026_04_16_000012_create_poll_votes_table	1
16	2026_04_16_000013_create_point_transactions_table	1
17	2026_04_16_000014_create_whatsapp_logs_table	1
18	2026_04_16_000015_create_whatsapp_verifications_table	1
19	2026_04_16_000016_create_reports_table	1
20	2026_04_16_000017_create_word_filters_table	1
21	2026_04_16_000018_create_sponsors_table	1
22	2026_04_16_000019_create_payment_methods_table	1
23	2026_04_16_000020_create_transactions_table	1
24	2026_04_16_000021_create_notifications_table	1
25	2026_04_16_000022_create_settings_table	1
26	2026_04_16_074708_create_admins_table	2
27	2025_01_01_000000_create_admins_table	1
28	2025_08_14_170933_add_two_factor_columns_to_users_table	1
29	2026_04_20_035543_create_songfess_analytics_table	3
30	2026_04_20_035547_create_songfess_filters_table	3
31	2026_04_20_044144_add_avatar_to_admins_table	4
32	2026_04_20_050829_create_songfess_messages_table	5
33	2026_04_20_050836_add_is_blocked_to_users_table	5
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 33, true);


--
-- PostgreSQL database dump complete
--

\unrestrict UIVwp53IH06S7DZu2hZXBw6Bx4A5gCbugWBxWbFLWIImDm7zBZdhFdzYrhSAoj8

