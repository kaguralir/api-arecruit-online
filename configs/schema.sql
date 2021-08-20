
CREATE TABLE  IF NOT EXISTS  users (

    user_id         serial primary key,
    user_name       varchar(150) not null,
    user_firstname  varchar(150) not null ,
    user_email      varchar(150) not null,
    user_password   varchar(150) not null,
    user_right      varchar(150) not null

);


CREATE TABLE  IF NOT EXISTS  user_info (

    user_info_id             serial primary key,
    user_nationality         varchar(150) ,
    user_phone_number        varchar(150)  ,
    user_address             varchar(150) ,
    user_department          varchar(150) ,
    user_city                varchar(150)  ,
    user_zip_code            varchar(150) ,
    user_country             varchar(150) ,
    user_id                  number,


    FOREIGN KEY(user_id) REFERENCES users(user_id)

);


CREATE TABLE IF NOT EXISTS company (

    company_id                  serial primary key,
    company_nationality         varchar(150) ,
    company_phone_number        varchar(150)  ,
    company_headquarters        varchar(150) ,
    company_address             varchar(150) ,
    company_department          varchar(150) ,
    company_city                varchar(150)  ,
    company_rcs                 varchar(150),
    company_zip_code            varchar(150) ,
    company_country             varchar(150) ,
    company_representative_id   numeric ,
    company_representative_status varchar(150),
    is_partner                  varchar(150) ,
    partner_type                varchar(150),
    consultant_id               numeric,


    FOREIGN KEY(company_representative_id) REFERENCES users(user_id),
    FOREIGN KEY(consultant_id) REFERENCES users(user_id)

);



CREATE TABLE  IF NOT EXISTS jobs (

    job_id              serial primary key,
    job_title           varchar(150),
    job_contract_type        varchar(150),
    job_presentation_pdf             varchar(150) ,
    job_presentation_video          varchar(150) ,
    job_country                varchar(150)  ,
    job_department            varchar(150) ,
    job_city             varchar(150) ,
    job_zip_code          varchar(150) ,
    job_required_level               varchar(150) ,
    job_required_grad              varchar(150) ,
    job_required_experience              varchar(150) ,
    job_creator_id              number,
    job_origin              varchar(150)

);



CREATE TABLE  IF NOT EXISTS cv_bank (

    candidat_id             number,
    searched_job1           varchar(150) ,
    searched_job2           varchar(150)  ,
    searched_job3           varchar(150) ,
    job_location1           varchar(150) ,
    job_location2           varchar(150)  ,
    job_location3           varchar(150) ,
    job_field1              varchar(150) ,
    job_field2              varchar(150) ,
    job_field3              varchar(150) ,
    experience1             varchar(150) ,
    experience2             varchar(150) ,
    experience3             varchar(150) ,
    studies_level           varchar(150) ,
    last_graduation         varchar(150) ,
    availability_job        varchar(150) ,
    cv_pdf                  varchar(150) ,
    cv_video                varchar(150) ,
    motivation_pdf          varchar(150) ,
    motivation_video        varchar(150) 


);

