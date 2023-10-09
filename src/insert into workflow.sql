insert into workflow.processes(process) values
('{"name":"diagram", "place":"p_9cc6ljn21jack3ag68i13"}');
insert into workflow.edges (id_processes, edge) values 
((select id from workflow.processes where process->>'name'='diagram'),
'{"direction":"p2t","pid":"p_9cc6ljn21jack3ag68i13","tid":"tata","type":"dummy"}'
);
insert into workflow.edges (id_processes, edge) values 
((select id from workflow.processes where process->>'name'='diagram'),
'{"direction":"t2p","altpath":true,"pid":"p_9cc6ljn21jack3ag68i13","tid":"tata"}'
);
insert into workflow.edges (id_processes, edge) values 
((select id from workflow.processes where process->>'name'='diagram'),
'{"direction":"p2t","pid":"p_9cc6ljn21jack3ag68i13","tid":"toto","type":"dummy"}'
);