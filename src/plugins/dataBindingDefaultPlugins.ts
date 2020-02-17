import { DataBindingTemplatePlugin } from "./dataBindingTemplatePlugin";
import { DataBindingBooleanPlugin } from "./dataBindingBooleanPlugin";
import { DataBindingDatePlugin } from "./dataBindingDatePlugin";
import { DataBindingTextPlugin } from "./dataBindingTextPlugin";

export function createDefaultDataBindingPlugins(): DataBindingTemplatePlugin[] {
  return [
    new DataBindingBooleanPlugin(),
    new DataBindingDatePlugin(),
    new DataBindingTextPlugin()
  ];
}
