create table shops (
	id int identity(1, 1) primary key,
    name nvarchar(50) not null,
	city nvarchar(20) not null,
	address nvarchar(100) not null
);