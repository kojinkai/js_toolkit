// React and Recompose branch loader pattern

import { branch, renderComponent } from 'recompose';

import UIComponent from './UIComponent';
import Loader from './Loader';

const withLoaderWhileLoading = branch(
  ({ loading }) => loading === true,
  renderComponent(Loader),
);

WithLoaderWhileLoading(UIComponent);
