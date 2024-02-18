import ModuleList from '../Modules/List';
import Status from './Status';

function Home() {
  return (
    <div className='flex-fill d-flex gap-5'>
      <ModuleList />
      <Status />
    </div>
  );
}

export default Home;
