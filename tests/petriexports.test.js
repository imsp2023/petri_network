QUnit.module("PetriExports");

QUnit.test("edge2SQLObject returns null when his argument is not an edge", assert =>{
    var so = PetriExports.edge2SQLObject({});
    assert.notOk(so, "argument must be an edge");
});

QUnit.test("SQL object must have direction attribute", assert =>{
    n_tab = 0;
    tab[0] = {comp:{name: 'foo_n', shape: {uuid: 'foo'}}};
    tab[1] = {comp:{name: 'bar_n', shape: {uuid: 'bar'}}};
    var so = PetriExports.edge2SQLObject({type: 'edge', comp: {direction: 't2p', src: 'foo', dst: 'bar'}});
    assert.ok(so, "sql object");
    assert.equal(so.direction, 't2p', "direction attribute");
});

QUnit.test("SQL object must have pid attribute", assert =>{
    n_tab = 0;
    tab[0] = {comp:{name: 'foo_n', shape: {uuid: 'foo'}}};
    tab[1] = {comp:{name: 'bar_n', shape: {uuid: 'bar'}}};
    var so = PetriExports.edge2SQLObject({type: 'edge', comp: {direction: 't2p', src: 'foo', dst: 'bar'}});
    assert.equal(so.pid, 'bar_n', "place id attribute");
});

QUnit.test("SQL object must have tid attribute", assert =>{
    n_tab = 0;
    tab[0] = {comp:{name: 'foo_n2', shape: {uuid: 'foo'}}};
    tab[1] = {comp:{name: 'bar_n2', shape: {uuid: 'bar'}}};
    var so = PetriExports.edge2SQLObject({type: 'edge', comp: {direction: 'p2t', src: 'foo', dst: 'bar'}});
    assert.equal(so.tid, 'bar_n2', "transition id attribute");
});

QUnit.test("SQL object must have type attribute when end place and direction is t2p", assert =>{
    n_tab = 0;
    tab[0] = {comp:{name: 'foo_n2', shape: {uuid: 'foo'}}};
    tab[1] = {comp:{name: 'bar_n2', type: 'end', shape: {uuid: 'bar'}}};
    var so = PetriExports.edge2SQLObject({type: 'edge', comp: {direction: 't2p', src: 'foo', dst: 'bar'}});
    assert.equal(so.type, 'end', "type related to end place");
});

QUnit.test("edge2SQLObject set type attribute with transition type when direction is p2t", assert =>{
    n_tab = 0;
    tab[0] = {comp:{name: 'foo_n2', shape: {uuid: 'foo'}}};
    tab[1] = {comp:{name: 'bar_n2', type: 'dummy', shape: {uuid: 'bar'}}};
    var so = PetriExports.edge2SQLObject({type: 'edge', comp: {direction: 'p2t', src: 'foo', dst: 'bar'}});
    assert.equal(so.type, 'dummy', "type related to transition");
});

QUnit.test("edge2SQLObject set role attribute when manual transition and p2t", assert =>{
    n_tab = 0;
    tab[0] = {comp:{name: 'foo_n2', shape: {uuid: 'foo'}}};
    tab[1] = {comp:{name: 'bar_n2', type: 'manual', role: 'role', shape: {uuid: 'bar'}}};
    PetriExports.Mode='prod';
    var so = PetriExports.edge2SQLObject({type: 'edge', comp: {direction: 'p2t', src: 'foo', dst: 'bar'}});
    assert.equal(so.role, 'role', "role attribute");
});

QUnit.test("edge2SQLObject set type to auto for automatic transition and p2t", assert =>{
    n_tab = 0;
    tab[0] = {comp:{name: 'foo_n2', shape: {uuid: 'foo'}}};
    tab[1] = {comp:{name: 'bar_n2', type: 'automatic', shape: {uuid: 'bar'}}};
    var so = PetriExports.edge2SQLObject({type: 'edge', comp: {direction: 'p2t', src: 'foo', dst: 'bar'}});
    assert.equal(so.type, 'auto', "auto value for automatic transition");
});

QUnit.test("edge2SQLObject set app attribute when automatic transition and p2t", assert =>{
    n_tab = 0;
    tab[0] = {comp:{name: 'foo_n2', shape: {uuid: 'foo'}}};
    tab[1] = {comp:{name: 'bar_n2', type: 'automatic', app: {}, shape: {uuid: 'bar'}}};
    var so = PetriExports.edge2SQLObject({type: 'edge', comp: {direction: 'p2t', src: 'foo', dst: 'bar'}});
    assert.ok(so.app, "app attribute for automatic transition");
});

QUnit.test("edge2SQLObject set cond attribute when cond on edge and p2t", assert =>{
    n_tab = 0;
    tab[0] = {comp:{name: 'foo_n2', shape: {uuid: 'foo'}}};
    tab[1] = {comp:{name: 'bar_n2', type: 'automatic', app: {}, shape: {uuid: 'bar'}}};
    var so = PetriExports.edge2SQLObject({type: 'edge', comp: {cond: 'foo', direction: 'p2t', src: 'foo', dst: 'bar'}});
    assert.equal(so.cond, 'foo', "cond attribute");
});

QUnit.test("edge2SQLObject set gate attribute when gate on edge and p2t", assert =>{
    n_tab = 0;
    tab[0] = {comp:{name: 'foo_n2', shape: {uuid: 'foo'}}};
    tab[1] = {comp:{name: 'bar_n2', type: 'dummy', gate: 'foo', shape: {uuid: 'bar'}}};
    var so = PetriExports.edge2SQLObject({type: 'edge', comp: {direction: 'p2t', src: 'foo', dst: 'bar'}});
    assert.equal(so.gate, 'foo', "gate attribute");
});

QUnit.test("edge2SQLObject set altpath attribute when altpath option", assert =>{
    n_tab = 0;
    tab[0] = {comp:{name: 'foo_n2', shape: {uuid: 'foo'}}};
    tab[1] = {comp:{name: 'bar_n2', type: 'automatic', app: {}, shape: {uuid: 'bar'}}};
    var so = PetriExports.edge2SQLObject({type: 'edge', comp: {gate: 'foo', direction: 'p2t', src: 'foo', dst: 'bar', shape: {altpath: true}}});
    assert.ok(so.altpath, "altpath attribute");
});

QUnit.test("edge2SQLObject set count attribute when {a|s}sub transition", assert =>{
    n_tab = 0;
    tab[0] = {comp:{name: 'foo_n2', shape: {uuid: 'foo'}}};
    tab[1] = {comp:{name: 'bar_n2', type: 'asub', count: 10, shape: {uuid: 'bar'}}};
    var so = PetriExports.edge2SQLObject({type: 'edge', comp: {gate: 'foo', direction: 'p2t', src: 'foo', dst: 'bar', shape: {altpath: true}}});
    assert.equal(so.count, 10, "count attribute");
});
