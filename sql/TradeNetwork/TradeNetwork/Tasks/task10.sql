--Update prices less than 1000 instead of 100

update products
set price = price * 1.5
where price < 1000