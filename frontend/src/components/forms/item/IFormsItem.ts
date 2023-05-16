import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IFormItem {
    title: string,
    input_type: string,
    placeholder: string,
    name: string;
    icon: IconProp;
}

export default IFormItem;
