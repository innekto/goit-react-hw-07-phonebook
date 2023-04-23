//сповіщення react
import { Toaster } from 'react-hot-toast';

const Message = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        // className: '',
        duration: 3000,
        style: {
          background: '#3382ad',
          color: '#fff',
        },
      }}
    />
  );
};

export default Message;
