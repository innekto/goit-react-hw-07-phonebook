import { ColorRing } from 'react-loader-spinner';
import { LoadWrapp } from 'components/Loader/Loader.styled';

export const Loader = () => {
  return (
    <LoadWrapp>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#5b93e1', '#60def4', '#6a73f8', '#9781bd', '#84929b']}
      />
    </LoadWrapp>
  );
};
