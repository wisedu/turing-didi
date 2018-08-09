import {Adapter} from './components/adapter';
import DidiFcGroup from './components/didi-fc-group.vue';
import DidiFcForm from './components/didi-fc-form.vue';
import DidiFcStatic from './components/didi-fc-static.vue';
import DidiFcText from './components/didi-fc-text.vue';
import DidiFcCell from './components/didi-fc-cell.vue';
import DidiFcReadonly from './components/didi-fc-readonly.vue';
// import AntdFcDate from './components/antd-fc-date.vue';
// import AntdFcDateRange from './components/antd-fc-date-range.vue';
// import AntdFcButtonlist from './components/antd-fc-buttonlist.vue';
// import AntdFcNumberRange from './components/antd-fc-number-range.vue';
// import AntdFcNumber from './components/antd-fc-number.vue';
// import AntdFcSelect from './components/antd-fc-select.vue';
// import AntdFcTree from './components/antd-fc-tree.vue';
// import AntdFcUploadfile from './components/antd-fc-uploadfile.vue';
// import AntdFcAutocomplete from './components/antd-fc-autocomplete.vue';
// import AntdFcRadiolist from './components/antd-fc-radiolist.vue';
// import AntdFcCheckboxlist from './components/antd-fc-checkboxlist.vue';
// import AntdFcSwitcher from './components/antd-fc-switcher.vue';
// import AntdGbGrid from './components/antd-gb-grid.vue';
// import AntdGbSearch from './components/antd-gb-search.vue';
import LayoutTmb from './layout/layout-tmb.vue';
import Form from './components/form.js';
import { defaults } from "tg-turing";

const components = {
    DidiFcGroup,DidiFcForm,DidiFcStatic,DidiFcText,DidiFcCell,DidiFcReadonly,LayoutTmb
};
const install = function (Vue, opts = {}) {
    if (install.installed) return;
    Object.keys(components).forEach((key) => {
        if (key === "utils") return;
        // Vue.customElement(components[key].name, components[key]);
        Vue.component(components[key].name, components[key]);
    });
};


if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function() {
            var self = this;
            function update(fn) {
                return function(value) {
                    var classes = self.className.split(/\s+/g),
                        index = classes.indexOf(value);

                    fn(classes, index, value);
                    self.className = classes.join(" ");
                }
            }

            return {
                add: update(function(classes, index, value) {
                    if (!~index) classes.push(value);
                }),

                remove: update(function(classes, index) {
                    if (~index) classes.splice(index, 1);
                }),

                toggle: update(function(classes, index, value) {
                    if (~index)
                        classes.splice(index, 1);
                    else
                        classes.push(value);
                }),

                contains: function(value) {
                    return !!~self.className.split(/\s+/g).indexOf(value);
                },

                item: function(i) {
                    return self.className.split(/\s+/g)[i] || null;
                }
            };
        }
    });
}

defaults.didi = {
    Adapter: Adapter,
    form: Form
};
defaults.currentType = "didi";

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    Adapter,install,
    ...components,
};