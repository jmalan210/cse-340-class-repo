-- Organization Table

Create Table organization (
organization_id SERIAL Primary Key,
name varchar(150) not null,
description text not null,
contact_email varchar(255) not null, 
logo_filename varchar (255) not null
);

insert into organization (name, description, contact_email, logo_filename)
values
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

create table service_projects (
project_id serial primary key,
organization_id int not null,
title varchar(255) not null,
description text not null,
location varchar(255) not null,
project_date date not null,
foreign key (organization_id) references organization(organization_id));

INSERT INTO service_projects (organization_id, title, description, location, project_date)

VALUES (1, 'Argonaut Planter Boxes', 'We will build planter boxes at Argonaut Elementary School.', 'Argonaut Elementary School', '2026-03-24'),

	(1, 'Rinconada Park Fences', 'We will install new fences at Rinconada Park', 'Rinconada Park', '2027-04-23'),

	(1, 'Rinconada Park Playground', 'Building a new playground at Rinconada Park', 'Rinconada Park', '2027-04-23'),

	(1, 'Community Garden Shed', 'We will build a shed for gardening tools at Green Valley Community Garden', 'Green Valley Community Garden', '2026-05-15'),

	(1, 'Local Library Renovation', 'We will renovate the community library to create a better learning space', 'Downtown Public Library', '2026-06-10'),

	(2, 'Urban Farm Workshop', 'We will host a workshop on sustainable farming practices in the city', 'City Hall Community Center', '2026-07-14'),

	(2, 'Pollinator Garden', 'We will plant a pollinator garden to support local bees and butterflies', 'Sunny Meadows Park', '2026-08-20'),

	(2, 'Hydroponic System Installation', 'We will install a hydroponic system at the local high school for educational purposes', 'Lincoln High School', '2026-09-12'),

	(2, 'Community Composting Program', 'We will initiate a composting program to reduce waste and enrich soil', 'City Community Recycling Center', '2026-09-30'),

	(2, 'Farm-to-Table Dinner', 'We will organize a farm-to-table dinner to raise funds and awareness for urban farming', 'Central City Pavilion', '2026-10-25'),

	(3, 'Annual Charity Walk', 'We will organize a charity walk to raise funds for local shelters', 'City Park', '2026-11-05'),

	(3, 'Clothing Drive', 'We will collect and distribute clothing to families in need', 'Community Center', '2026-12-03'),

	(3, 'Food Pantry Setup', 'We will set up a food pantry to support low-income families in our community', 'Local Elementary School', '2027-01-10'),

	(3, 'Book Donation Campaign', 'We will collect and donate books to underprivileged children', 'Local Library', '2027-02-15'),
	
	(3, 'Toys for Tots Drive', 'We will organize a toy drive to provide gifts for children in need during the holidays', 'City Hall', '2027-03-01');