import { useMessage, NAlert } from 'naive-ui';
import { h, reactive } from 'vue';

export default function () {
  const message = useMessage();
  const defaultMessageProps = reactive({
    title: 'Attention !',
    closable: true,
    // type: 'default',
    // style: { width: '480px' },
    // onClose: () => void,
    // onLeave: () => void,
    // onAfterLeave: () => void,
  });

  let messageProps = reactive(null);
  messageProps = defaultMessageProps;

  const setMessageProps = (value) => {
    messageProps = value;
  };

  const renderMessage = (props) => {
    const { type } = props;

    return h(NAlert, {
      ...props,
      type: type === 'loading' ? 'default' : type,
      ...messageProps && messageProps,
    },
    {
      default: () => props.content,
    });
  };

  const showAlertMessage = (type, content) => {
    messageProps.title = `${type.charAt(0).toUpperCase()}${type.slice(1, type.length)}`;
    message[type](content, { render: renderMessage });

    // setMessageProps(null);
  };

  return { setMessageProps, showAlertMessage };
}
