const path = require('path');

const homeTmpl = './template/Home/index';
const contentTmpl = './template/Content/index';
const appShellTmpl = './template/AppShell';

function pickerGenerator(module) {
  const tester = new RegExp(`^docs/${module}`);
  return markdownData => {
    const { filename } = markdownData.meta;
    if (tester.test(filename) && !/\/demo$/.test(path.dirname(filename))) {
      return {
        meta: markdownData.meta,
      };
    }
    return null;
  };
}

function pickerSrcGenerator(module) {
  const tester = new RegExp(`^src/${module}`);
  return markdownData => {
    const { filename } = markdownData.meta;
    if (tester.test(filename) && !/\/demo$/.test(path.dirname(filename))) {
      return {
        meta: markdownData.meta,
      };
    }
    return null;
  };
}

module.exports = {
  lazyLoad(nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true;
    }
    return nodePath.endsWith('/demo');
  },
  pick: {
    components(markdownData) {
      const { filename } = markdownData.meta;
      if (
        !/^components/.test(filename) ||
        !/^src/.test(filename) ||
        /[/\\]demo$/.test(path.dirname(filename))
      ) {
        return null;
      }
      return {
        meta: markdownData.meta,
      };
    },
    changelog(markdownData) {
      if (/CHANGELOG/.test(markdownData.meta.filename)) {
        return {
          meta: markdownData.meta,
        };
      }
      return null;
    },
    'docs/react': pickerGenerator('react'),
    'docs/spec': pickerGenerator('spec'),
    'docs/daji': pickerGenerator('daji'),
  },
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2&keepElem',
    'bisheng-plugin-antd?injectProvider',
    'bisheng-plugin-react?lang=__react',
  ],
  routes: {
    path: '/',
    component: './template/Layout/index',
    indexRoute: { component: homeTmpl },
    childRoutes: [
      {
        path: 'app-shell',
        component: appShellTmpl,
      },
      {
        path: 'index-cn',
        component: homeTmpl,
      },
      {
        path: 'docs/react/:children',
        component: contentTmpl,
      },
      {
        path: 'docs/daji/:children',
        component: contentTmpl,
      },
      {
        path: 'changelog',
        component: contentTmpl,
      },
      {
        path: 'changelog-cn',
        component: contentTmpl,
      },
      {
        path: 'components/:children/',
        component: contentTmpl,
      },
      {
        path: 'docs/spec/:children',
        component: contentTmpl,
      },
    ],
  },
};
