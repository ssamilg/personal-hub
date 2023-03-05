import { reactive } from 'vue';

export default function () {
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

  const showAlertMessage = (type, content) => {
    messageProps.title = `${type.charAt(0).toUpperCase()}${type.slice(1, type.length)}`;
    console.log(content);
  };

  return { setMessageProps, showAlertMessage };
}
