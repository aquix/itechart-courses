/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

:r .\DataSample\customers.sql
:r .\DataSample\orders.sql
:r .\DataSample\orders_products.sql
:r .\DataSample\products.sql
:r .\DataSample\shops.sql
:r .\DataSample\shops_products.sql