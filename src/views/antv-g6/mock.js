export const mock1 = {
  id: 'root',
  topic: 'Modeling Methods',
  children: [
    {
      id: 'classification',
      topic: 'Classification',
      children: [
        { id: 'logistic_regression', topic: 'Logistic regression' },
        { id: 'lda', topic: 'Linear discriminant analysis' },
        { id: 'rules', topic: 'Rules' },
        { id: 'decision_trees', topic: 'Decision trees' },
        { id: 'naive_bayes', topic: 'Naive Bayes' },
        { id: 'knn', topic: 'K nearest neighbor' },
        { id: 'pnn', topic: 'Probabilistic neural network' },
        { id: 'svm', topic: 'Support vector machine' }
      ]
    },
    {
      id: 'consensus',
      topic: 'Consensus',
      children: [
        {
          id: 'models_diversity',
          topic: 'Models diversity',
          children: [
            { id: 'diff_init', topic: 'Different initializations' },
            { id: 'diff_params', topic: 'Different parameter choices' },
            { id: 'diff_arch', topic: 'Different architectures' },
            { id: 'diff_methods', topic: 'Different modeling methods' },
            { id: 'diff_training', topic: 'Different training sets' },
            { id: 'diff_features', topic: 'Different feature sets' }
          ]
        },
        {
          id: 'methods',
          topic: 'Methods',
          children: [
            { id: 'classifier_selection', topic: 'Classifier selection' },
            { id: 'classifier_fusion', topic: 'Classifier fusion' }
          ]
        },
        {
          id: 'common',
          topic: 'Common',
          children: [
            { id: 'bagging', topic: 'Bagging' },
            { id: 'boosting', topic: 'Boosting' },
            { id: 'adaboost', topic: 'AdaBoost' }
          ]
        }
      ]
    },
    {
      id: 'regression',
      topic: 'Regression',
      children: [
        { id: 'mlr', topic: 'Multiple linear regression' },
        { id: 'pls', topic: 'Partial least squares' },
        { id: 'mlffnn', topic: 'Multi-layer feedforward neural network' },
        { id: 'grnn', topic: 'General regression neural network' },
        { id: 'svr', topic: 'Support vector regression' }
      ]
    }
  ]
}
