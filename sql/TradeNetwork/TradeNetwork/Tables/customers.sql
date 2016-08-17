create table customers (
    id int identity(1, 1) primary key,
    first_name nvarchar(20) not null,
	last_name nvarchar(20) not null
)