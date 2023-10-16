insert into workflow.processes(process) values
('{"name":"diagram", "place":"p_o9eowcm4pl4h4p0dzqa87"}');
insert into workflow.edges (id_processes, edge) values 
((select id from workflow.processes where process->>'name'='diagram'),
'{"direction":"p2t","pid":"p_o9eowcm4pl4h4p0dzqa87","tid":"t_u06x7pktoat6kg5qtwoah","type":"dummy"}' 
);
insert into workflow.edges (id_processes, edge) values 
((select id from workflow.processes where process->>'name'='diagram'),
'{"direction":"t2p","pid":"p_3623ooz95p86csh0qh907a","tid":"t_u06x7pktoat6kg5qtwoah"}' 
);
insert into workflow.edges (id_processes, edge) values 
((select id from workflow.processes where process->>'name'='diagram'),
'{"direction":"p2t","pid":"p_o9eowcm4pl4h4p0dzqa87","tid":"t_qlgnhv0qjli7qsb3qw5977","type":"dummy"}'
);
insert into workflow.edges (id_processes, edge) values 
((select id from workflow.processes where process->>'name'='diagram'),
'{"direction":"t2p","pid":"p_3623ooz95p86csh0qh907a","tid":"t_qlgnhv0qjli7qsb3qw5977"}'
);