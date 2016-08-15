create table shops (
	id int identity(1, 1) primary key,
    name nvarchar(50) not null,
	city nvarchar(20) not null,
	address nvarchar(100) not null
);

create table products (
	id int identity(1, 1) primary key,
	name nvarchar(100) not null,
	price decimal not null
);

create table shops_products (
	shop_id int not null,
	product_id int not null
);

create table orders (
	id int identity(1, 1) primary key,
    amount int not null,
    date datetime not null,
    price decimal not null,
    customer_id int not null
);

create table orders_products (
	order_id int not null,
	product_id int not null
);

create table customers (
    id int identity(1, 1) primary key,
    first_name nvarchar(20) not null,
	last_name nvarchar(20) not null
)