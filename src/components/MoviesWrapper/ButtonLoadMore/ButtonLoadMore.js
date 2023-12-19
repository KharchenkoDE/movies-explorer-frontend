import './ButtonLoadMore.css';

function ButtonLoadMore({ onClick }) {

  return (
    <button
      className="button__load-more"
      type='button'
      onClick={() => onClick()}
    >
      Еще
    </button>

  );
}

export default ButtonLoadMore;
