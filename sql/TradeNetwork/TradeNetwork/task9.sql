select customers.first_name, customers.last_name, customer_costs.cost
from (select customers.id, sum(orders.price) as cost
	  from orders
	  join customers
	  on orders.customer_id = customers.id
	  where orders.date >= '2014-01-01' and orders.date < '2014-12-31'
	  group by customers.id) as customer_costs
join customers
on customers.id = customer_costs.id
where customer_costs.cost > 1000000
order by customer_costs.cost desc