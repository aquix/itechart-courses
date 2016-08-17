create table orders (
	id int identity(1, 1) primary key,
    amount int not null,
    date datetime not null,
    price decimal not null,
    customer_id int not null,
    shop_id int not null,
);