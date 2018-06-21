import {Adapter} from './components/Adapter';
import IviewFcGroup from './components/iview-fc-group';
import IviewFcForm from './components/iview-fc-form';
import IviewFcStatic from './components/iview-fc-static';
import IviewFcText from './components/iview-fc-text';
import IviewFcTextArea from './components/iview-fc-textarea';
import IviewFcDate from './components/iview-fc-date';
import IviewFcButtonlist from './components/iview-fc-buttonlist';
import IviewFcNumberRange from './components/iview-fc-number-range';
import IviewFcNumber from './components/iview-fc-number';
import IviewFcSelect from './components/iview-fc-select';
import IviewFcUploadfile from './components/iview-fc-uploadfile';
import Form from './components/form.js';

const components = {
    IviewFcGroup,IviewFcForm,IviewFcStatic,IviewFcText,IviewFcTextArea,IviewFcDate,IviewFcButtonlist,IviewFcNumberRange,IviewFcNumber,IviewFcSelect,IviewFcUploadfile
};
const install = function (Vue, opts = {}) {
    if (install.installed) return;
    Object.keys(components).forEach((key) => {
        if (key === "utils") return;
        // Vue.customElement(components[key].name, components[key]);
        Vue.component(components[key].name, components[key]);
    });
};
const init = function () {
    window["tg-turing"].iview = {
        Adapter: Adapter,
        form: Form
    };
}
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default Object.assign({}, {
    Adapter,install, init,
    ...components,
});