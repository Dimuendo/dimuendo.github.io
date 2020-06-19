import Loadable from 'react-loadable';
import Loading from './Loading';

const AsyncTeamComps = Loadable({
  loader: () => import('./CompPanel'),
  loading: Loading
});

export default { AsyncTeamComps };
