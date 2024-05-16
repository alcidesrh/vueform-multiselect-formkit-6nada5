import { generateClasses } from '@formkit/themes';
import { en } from '@formkit/i18n';
import { DefaultConfigOptions, createInput } from '@formkit/vue';
import FormkitMultiselectWrapper from './components/FormkitMultiselectWrapper.vue';

const multiselect = createInput(FormkitMultiselectWrapper, {
  props: ['options'],
});

const isCheckboxAndRadioMultiple = (node) =>
  (node.props.type === 'checkbox' || node.props.type === 'radio') &&
  node.props.options;

function addAsteriskPlugin(node) {
  node.on('created', () => {
    const schemaFn = node.props.definition.schema;
    node.props.definition.schema = (sectionsSchema = {}) => {
      const isRequired = node.props.parsedRules.some(
        (rule) => rule.name === 'required'
      );

      if (isRequired) {
        if (isCheckboxAndRadioMultiple(node)) {
          sectionsSchema.legend = {
            children: [
              '$label',
              {
                $el: 'span',
                children: ['*'],
              },
            ],
          };
        } else {
          sectionsSchema.label = {
            children: [
              '$label',
              {
                $el: 'span',
                children: ['*'],
              },
            ],
          };
        }
      }
      return schemaFn(sectionsSchema);
    };
  });
}

const simpleInputClasses = {
  outer: 'mb-3',
  label: 'form-label',
  input: 'form-control',
  help: 'text-muted',
  message: 'invalid-feedback',
  messages: 'invalid-feedback',
};

const config: DefaultConfigOptions = {
  config: {
    locales: { en },
    locale: 'en',
    classes: generateClasses({
      text: simpleInputClasses,
      number: simpleInputClasses,
      password: simpleInputClasses,
      file: simpleInputClasses,
      select: {
        outer: 'mb-3',
        label: 'form-label',
        input: 'form-select',
      },
      submit: {
        input: 'btn btn-primary',
      },
    }),
  },
  plugins: [addAsteriskPlugin],
  inputs: {
    multiselect,
  },
};

export default config;
