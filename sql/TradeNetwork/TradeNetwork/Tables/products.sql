create table products (
	id int identity(1, 1) primary key,
	name nvarchar(200) not null,
	price decimal not null
);