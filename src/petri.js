import {Register} from "./register";
import {ComponentFactory} from "./factory";
import {Event} from "./event";
import {config} from "../config";
import { layout } from "./layout";

let paya;

export const init = ()=>{
    try{
        paya = aya.init(2000, 2000);
        paya.grid(paya.svg);
        paya.config.link.end_start = config.end_start;
        paya.config.link.end_dest = config.end_dest;

        paya.svg.addEventListener("mousemove", (e)=>{
            if(Event.state == 'linking'){
                Event.line.dest_x = e.clientX;
                Event.line.dest_y = e.clientY;
                Event.line.redraw();
            }else if(Event.state == 'selection'){
                Event.src.resize(e.clientX-Event.x, e.clientY-Event.y);
                Event.x = e.clientX;
                Event.y = e.clientY;
            }else if(Event.state == 'moving_lasso'){
                Event.src.move(e.clientX-Event.x, e.clientY-Event.y);
                Event.x = e.clientX;
                Event.y = e.clientY;
            }
        });
        
        paya.svg.addEventListener("mouseup", (e)=>{
            // console.log('mouseUP SVG state='+Event.state);
            if(Event.state == 'linking'){
                Event.line.removeFromDOM();
                Event.line = null;
                Event.src = null;
                Event.state = null;
            }
            else if(Event.state == 'selection'){
                Event.src.lockComponent();
                Event.src = null;
                Event.state = null;
            }
        });
    
        paya.svg.addEventListener("mousedown", (e)=>{
        // console.log('mouseDOWN SVG state='+Event.state);
        if(Event.state != null)
            return;
    
        Event.state = 'selection';
    
        Event.x = e.clientX;
        Event.y = e.clientY;
        Event.src = ComponentFactory.getComponent('lasso', {x: Event.x, y: Event.y});
        });

        layout.init( config.cellW,  config.cellH, config.svg_width,  config.svg_height);
        globalThis.paya = paya;
    }
    catch(e){
        console.error(e);
    }
}

export const _new = ()=>{
    var cps = [];
    Register.forEach(cp => {
    if (cp.type != "edge")
        cps.push(cp);
    }, cps);

    cps.map((c)=>{c.actions['deletion'](c);});
    cps.length = 0;
    
    ComponentFactory.getComponent("place", { type: 'start', x: 100, y: 350 });
}

export const load = (data)=>{
    var cps = [];
    Register.forEach(cp => {
    if (cp.type != "edge")
        cps.push(cp);
    }, cps);

    cps.map((c)=>{c.actions['deletion'](c);});
    cps.length = 0;
    
    data.places.map((p)=>{
        ComponentFactory.getComponent("place", p);
    });
    data.transitions.map((t)=>{
        ComponentFactory.getComponent("transition", t);
    });
    data.edges.map((e)=>{
        ComponentFactory.getComponent("edge", e);
    });
}

export const save_as_svg = ()=>{
    const svg = document.getElementById("viewport").children[0];
    saveFile(svg.outerHTML,"diagram.svg","image/svg+xml")
}

// save should return an object
export const save = ()=>{
    var data = { edges: [], places: [], transitions: [] };
    Register.forEach(comp => {
        data[comp.type + 's'].push(comp.save())
    }, data);
    return data;
}

export const saveFile = (data, name, type)=>{
    let blob = new Blob([data], { type });
    if (typeof navigator.msSaveBlob == "function")
        return navigator.msSaveBlob(blob, file_name);

    var saver = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    var blobURL = saver.href = URL.createObjectURL(blob);
    var body = document.body;

    saver.download = name;

    body.appendChild(saver);
    saver.dispatchEvent(new MouseEvent("click"));
    body.removeChild(saver);
    URL.revokeObjectURL(blobURL);
}

export const editor = () => {
    // edge -> src, destn , direction, condition
    var edge = () => {
        return {
        view(vnode) {
            let node = vnode.attrs.node;
            console.log(node);
            return m(".flex.flex-col.p-4.w-full", [
            m("", [
                m("label.block.mb-3", "Src"),
                m("input[disabled]", { value: node.comp.src, onchange: (e) => node.comp.src = e.target.value })
            ]),
            m("", [
                m("label.block.mb-3", "Destination "),
                m("input[disabled]", { value: node.comp.dest, onchange: (e) => node.comp.dest = e.target.value })
            ]),
            m("", [
                m("label.block.mb-3", "Direction"),
                m("input[disabled]", { value: node.comp.direction, onchange: (e) => node.comp.direction = e.target.value })
            ]),
            node.comp.cond != undefined && m("", [
                m("label.block.mb-3", "Condition"),
                m("input", { value: node.comp.cond, onchange: (e) => {node.comp.setCond(e.target.value);} })
            ])
            ])
        }
        }
    };
    // place -> uuid, type {start, end, intermediary}, name
    var place = () => {
        let types = ["start", "intermediary", "end"]
        return {
        view(vnode) {
            var node = vnode.attrs.node
            return m(".flex.flex-col.p-4.w-full", [
            m("", [
                m("label.block.mb-3", "UUID"),
                m("input", { value: node.comp.shape.uuid, disabled: true })
            ]),
            m("", [
                m("label.block.mb-3", "Type"),
                m("select",
                {
                    onchange: (e) => {
                        node.comp.setType(e.target.value);
                        node.comp.shape.shape.redraw();
                    }
                },
                types.map((type, idx) =>
                    m("option", {
                    key: idx,
                    value: type,
                    selected: node.comp.type == type,
                    }, type))
                )]),
            m("", [
                m("label.block.mb-3", "Name"),
                m("input", { value: node.comp.name, onchange: (e) => node.comp.name = e.target.value })
            ]),
            ])
        }
        }
    };
    // transition -> uuid, type {auto, manual, clock , ssub, asub}, name, ca, gateway, role, resource id, resource name, 
    var transition = {
        view(vnode) {
        var node = vnode.attrs.node
        // console.log(node);
        const types = ["dummy","automatic", "event", "manual", "clock", "ssub", "asub"];
        const rnames = ["get", "put", "post", "delete"];
        const gateways = ["and_join", "xor_join"];
        return m(".grid.grid-cols-2", [
            m(".p-2.border-r",
            m(".flex.flex-col.px-4", [
                m("", [
                m("label.block.mb-3", "UUID"),
                m("input", { value: node.comp.shape.uuid, disabled: true })
                ]),
                m("", [
                m("label.block.mb-3", "type"),
                m("select",
                    {
                    onchange: (e) => {
                        node.setType(e.target.value);
                    }
                    },
                    types.map((type, idx) =>
                    m("option", {
                        key: idx,
                        value: type,
                        selected: node.comp.type == type,
                    }, type))
                ),
                ]),
                node.comp.ca && m("", [
                m("label.block.mb-3", "Cancel activity"),
                m("input", { value: node.comp.ca, disabled: true})
                ]),
                node.comp.type == "automatic" && m("", [
                m("label.block.mb-3", "Resource name"),
                m("select",
                    {
                    onchange: (e) => {
                        node.comp.app.name = e.target.value;
                    }
                    },
                    rnames.map((name, idx) =>
                    m("option", {
                        key: idx,
                        value: name,
                        selected: node.comp.app.name == name,
                    }, name))
                )]),
            ]),
            ),
            m(".p-2", m(".flex.flex-col.px-4", [
            m("", [
                m("label.block.mb-3", "Name"),
                m("input", {
                value: node.comp.name,
                onchange: (e) => {node.comp.setName(e.target.value);}
                })
            ]),
            m("", [
                m("label.block.mb-3", "Gateway"),
                m("select",
                {
                    onchange: (e) => {
                    node.comp.setGate(e.target.value)
                    }
                },
                gateways.map((gateway, idx) =>
                    m("option", {
                    key: idx,
                    value: gateway,
                    selected: node.comp.gate == gateway || (gateway == "and_join" && node.comp.gate == undefined),
                    }, gateway))
                ),
                node.comp.type == "manual" && m("", [
                m("label.block.mb-3", "Role"),
                m("input", { value: node.comp.app.role, onchange: (e) => node.comp.app.role = e.target.value })
                ]),
            ]),
            ])),
            node.comp.type == "automatic" && m(".px-4.col-span-2", [
            m("label.block.mb-3", "Resource uri"),
            m("input.border", { value: node.comp.name, onchange: (e) => node.comp.name = e.target.value })
            ]),
        ])
        }
    };
    
    var config = {
    
        view(vnode) {
        const node = vnode.attrs.config;
        return m(".fixed.border.border-1.right-0.top-0.bottom-0.bg-white.flex.flex-col",
            { style: "min-width:25%; box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 12px;}" }, [
            m(".flex.justify-between.border-b.px-4.py-2",
            m("label.text-2xl.font-medium", "Config"),
            m("button", {
                onclick: () => {
                vnode.attrs.config = null;
                }
            }, [
                m("svg[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round'][color='currentColor']",
                { class: "text-gray-400 hover:text-gray-600 active:text-gray-800" },
                [
                    m("line[x1='18'][y1='6'][x2='6'][y2='18']"),
                    m("line[x1='6'][y1='6'][x2='18'][y2='18']")
                ]
                )
            ])),
            m(".flex-1.flex.justify-center.flex-col", [
            m("", [
                m(".flex.items-center.justify-between.mx-6.m-2", [
                m("label.text-xl.font-medium", node.type),
                m("button.btn.rounded-xl.w-fit.self-end", {
                    onclick: () => {
                        // vnode.attrs.config.node.remove();
                        vnode.attrs.config.actions['deletion'](vnode.attrs.config);
                        vnode.attrs.config = null;
    
                    }
                }, 
                    m("svg[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round'][color='currentColor']",
                        { class: "text-red-300 hover:text-red-500 active:text-red-600 focus:test-red-400" }, 
                        [
                            m("path[d='M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z']"),
                            m("line[x1='18'][y1='9'][x2='12'][y2='15']"),
                            m("line[x1='12'][y1='9'][x2='18'][y2='15']")
                        ]
                    )
                ),
                ]), m("hr.mx-6.border-black.border-1")]),
            [
                node.type == "place" && m(place, { node }),
                node.type == "edge" && m(edge, { node }),
                node.type == "transition" && m(transition, { node }),
            ]
            // m(".px-8", m(vnode.attrs.mode.configView)),
            ])
        ])
        }
    };
    return {
        oncreate(vnode) {
            vnode.dom.append(paya.svg);
        },
        view: (vnode) => {
            return m("#viewport",{
            onclick(){}
            }, [
            Event.config.node && m(config, { config: Event.config.node})
            ])
        }
    }
}