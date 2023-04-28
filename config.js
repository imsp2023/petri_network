// edge -> src, destn , direction, condition
const edge = () => {
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
}
// place -> uuid, type {start, end, intermediary}, name
const place = () => {
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
                node.comp.type = e.target.value;
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
}
// transition -> uuid, type {auto, manual, clock , ssub, asub}, name, ca, gateway, role, resource id, resource name, 
const transition = {
  view(vnode) {
    var node = vnode.attrs.node
    console.log(node)
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
                  node.comp.setType(e.target.value);
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
}


const config = {
  view(vnode) {
    const node = vnode.attrs.config.node
    return m(".fixed.border.border-1.right-0.top-0.bottom-0.bg-white.flex.flex-col",
      { style: "min-width:25%; box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 12px;}" }, [
      m(".flex.justify-between.border-b.px-4.py-2",
        m("label.text-2xl.font-medium", "Config"),
        m("button", {
          onclick: () => {
            vnode.attrs.config.node = null;
          }
        }, m(Icon.X, {
          class: "text-gray-400 hover:text-gray-600 active:text-gray-800"
        }))),
      m(".flex-1.flex.justify-center.flex-col", [
        m("", [
          m(".flex.items-center.justify-between.mx-6.m-2", [
            m("label.text-xl.font-medium", node.type),
            m("button.btn.rounded-xl.w-fit.self-end", {
              onclick: () => {
                  vnode.attrs.config.node.remove();
                  vnode.attrs.config.node = null;

              }
            }, m(Icon.Delete, {
              class: "text-red-300 hover:text-red-500 active:text-red-600 focus:test-red-400"
            })),
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
}
