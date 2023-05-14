const users = `CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nickname character varying(32) COLLATE pg_catalog."default" NOT NULL,
    exp integer NOT NULL,
    lvl integer NOT NULL,
    hp integer NOT NULL,
    current_hp integer NOT NULL,
    str integer NOT NULL,
    vit integer NOT NULL,
    dex integer NOT NULL,
    acc integer NOT NULL,
    dmg integer NOT NULL,
    current_exp integer NOT NULL,
    free_stats integer NOT NULL,
    bosses_defeated integer NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;`

const bot = `CREATE TABLE IF NOT EXISTS public.bot
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nickname character varying(32) COLLATE pg_catalog."default" NOT NULL,
    lvl integer NOT NULL,
    hp integer NOT NULL,
    current_hp integer NOT NULL,
    str integer NOT NULL,
    vit integer NOT NULL,
    dex integer NOT NULL,
    acc integer NOT NULL,
    dmg integer NOT NULL,
    date bigint NOT NULL,
    attacker_nickname character varying COLLATE pg_catalog."default" NOT NULL,
    diff integer NOT NULL,
    CONSTRAINT bot_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.bot
    OWNER to postgres;`

const character = `CREATE TABLE IF NOT EXISTS public."character"
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nickname character varying(32) COLLATE pg_catalog."default" NOT NULL,
    exp integer NOT NULL,
    lvl integer NOT NULL,
    hp integer NOT NULL,
    current_hp integer NOT NULL,
    str integer NOT NULL,
    vit integer NOT NULL,
    dex integer NOT NULL,
    acc integer NOT NULL,
    dmg integer NOT NULL,
    current_exp integer NOT NULL,
    free_stats integer NOT NULL,
    bosses_defeated integer NOT NULL,
    "time" integer NOT NULL,
    password character varying(32) COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."character"
    OWNER to postgres;`

const items = `CREATE TABLE IF NOT EXISTS public.items
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(32) COLLATE pg_catalog."default",
    hp integer,
    type character varying(32) COLLATE pg_catalog."default",
    url character varying(32) COLLATE pg_catalog."default",
    set_name character varying(32) COLLATE pg_catalog."default",
    lvl integer,
    rar character varying(32) COLLATE pg_catalog."default",
    str integer,
    dex integer,
    vit integer,
    acc integer,
    dmg integer,
    "time" real,
    is_weared boolean,
    character_name character varying(32) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.items
    OWNER to postgres;`

const tasks = `CREATE TABLE IF NOT EXISTS public.tasks
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    value character varying(32) COLLATE pg_catalog."default" NOT NULL,
    result numeric(32,0) NOT NULL,
    created character varying(32) COLLATE pg_catalog."default" NOT NULL,
    character_nickname character varying(32) COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tasks
    OWNER to postgres;`

exports.tables = [
  users, bot, character, items, tasks
]