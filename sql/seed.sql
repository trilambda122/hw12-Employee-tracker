USE Employee_tracking_DB;

INSERT INTO department (name, id) VALUES ("engineering",1)
,("field services",2)
,("accouting",3)
,("construction",4)
,("human resources",5)
,("executive",6);


INSERT INTO role (title,salary,department_id,id) VALUES ("software tech 1",50000.00,1,101)
,("software tech 2",75000.00,1,102)
,("senior dev",115000.00,1,103)
,("field tech 1",50000.00,2,201)
,("field tech 2",80000.00,2,202)
,("accountant",80000.00,3,301)
,("controller",120000.00,3,302)
,("construction coordinator",60000.00,4,401)
,("construction manager",80000.00,4,402)
,("hr generalist",60000.00,5,501)
,("hr manager",100000.00,5,502)
,("ceo",200000.00,6,601)
,("cfo",250000.00,6,602);

INSERT INTO employee (first_name,last_name,role_id) VALUES
("Isabel","Archer",102)
,("Parson","Adams",301)
,("Molly","Bloom",402)
,("James","Bond",202)
,("David","Copperfield",601)
,("Dorian","Gray",602)
,("Mike","Hammer",401)
,("Anna","Karenina",103)
,("Sara","Monday",502)
,("Lucy","Snowe",501)
