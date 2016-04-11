
use ndarray::{RcArray,Ix, Axis, ArrayView, stack};
use traits::SupervisedLearning;


/// Rectangular matrix.
pub type Mat<A> = RcArray<A, (Ix, Ix)>;

/// Feature view
pub type Feature<'a,A> = ArrayView<'a,A, Ix>;

/// Col matrix.
pub type Col<A> = RcArray<A, Ix>;



#[derive(Debug, Clone)]
/// Node represents a node of the decision tree: Internal or Leaf Node.
pub enum Node {
    Internal {
        /// Feature split
        feature : usize,
        /// Feature split threshold
        threshold : f64,
        /// node left and right children, placed on heap.
        children : Box <(Node, Node)>
    },
    Leaf {
        /// terminal probability that the sample is of class 1.
        probability : f64
    }
}

#[derive(Debug, Clone)]
/// DecisionTree represents the full decision tree model

pub struct DecisionTree{
    /// maximum depth of the tree
    pub max_depth : i32,
    /// minimum number of samples to split on
    pub min_samples_split : i32,
    /// number of features
    pub n_features : usize,
    /// number of outputs
    pub n_outputs : usize,
    /// array of classes
    pub classes : Col<f64>,
    /// number of classes
    pub n_classes : usize,
    /// root node of tree
    pub root: Option<Node>
}

impl DecisionTree {
    /// create new decision tree
    pub fn new() -> DecisionTree {
        DecisionTree {
            max_depth : 0,
            min_samples_split : 0,
            n_features : 0,
            n_outputs : 0,
            classes : RcArray::from_vec(vec![0.0]),
            n_classes : 0,
            root : None
        }
    }

    /// Split a feature column in training data.
    /// # Arguments:
    ///
    /// * `X` - original training data
    /// * `indices` - indices of data subset fed to node
    /// * `feature_idx` - index of current feature to split on
    /// * `threshold` - threshold to apply to current split
    ///
    /// # Example:
    /// ```
    /// extern crate rsml;
    /// extern crate ndarray;
    /// extern crate rand;
    /// extern crate ndarray_rand;
    /// use ndarray_rand::RandomExt;
    /// use ndarray::RcArray;
    /// use rand::distributions::Range;
    /// use rsml::tree::model::DecisionTree;
    /// fn main(){
    ///     let z = RcArray::random((10,5), Range::new(0.,10.));
    ///     let feature_idx = 4;
    ///     let value = 4.0;
    ///     let (left, right) = DecisionTree::split(z.column(feature_idx),value);
    ///     assert!(left.iter().all(|&x| z.get((x,feature_idx)).unwrap() <= &value));
    ///     assert!(right.iter().all(|&x| z.get((x,feature_idx)).unwrap() > &value))
    /// }
    /// ```
    pub fn split(feature : Feature<f64>, threshold : f64) -> (Vec<usize>,Vec<usize>){

        let mut a_idx = Vec :: new();
        let mut b_idx = Vec :: new();

        for (idx, &elem) in feature.iter().enumerate(){
            match elem {
                x if x <= threshold =>{ a_idx.push(idx)}
                x if x > threshold => {b_idx.push(idx)}
                _ => continue
            }
        }

        (a_idx, b_idx)
    }

    /// Determine optimal threshold to split data
    /// # Arguments:
    ///
    /// * `X` - original training data
    /// * `feature_idx` - index of current feature to split on
    /// * `y` - original target data
    /// * `indices` - indices of data subset fed to node
    ///
    /// # Example:
    /// ```
    /// extern crate ndarray;
    /// extern crate rsml;
    /// use ndarray :: {rcarr2, RcArray};
    /// use rsml::tree::model::*;
    /// fn main(){
    ///     let x = rcarr2(&[[-1.0], [-0.5], [0.0], [0.0],[0.0],[0.5],[1.0]]);
    ///     let y = RcArray::from_vec(vec![1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
    ///     let (threshold, split_impurity) = DecisionTree::find_optimal_split(x.column(0), &y);
    ///     assert!(threshold == -0.5);
    ///     assert!(split_impurity == 0.0);
    /// }
    /// ```
    pub fn find_optimal_split(feature : Feature<f64>, target : &Col<f64>) -> (f64, f64) {

            let mut split_impurity = 1.0f64 / 0.0f64;
            let mut threshold = 0.0;
            let mut cumulative_y = 0.0;
            let mut cumulative_count = 0.0;

            let mut xy_pairs = feature.iter().zip(target.iter()).collect::<Vec<_>>();
            xy_pairs.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());

            for (&x, &y) in xy_pairs{
                cumulative_count += 1.0;
                cumulative_y += y;

                let p_left = cumulative_y / target.iter().fold(0.0,|a, &b| a + b) ;
                let p_right = 1.0 - p_left;
                let left_proportion = cumulative_count / target.len() as f64;

                let impurity = DecisionTree::gini_impurity(left_proportion,
                                                                 p_left,
                                                                 p_right);
                 if impurity < split_impurity {
                     split_impurity = impurity;
                     threshold = x;
                 }
         }
            (threshold, split_impurity)

        }

        /// Determine the information gain for a split during learning.
        /// # Arguments:
        ///
        /// * `left_child_proportion` - proportion of target data that map to left child data
        /// * `left_child_probability` - proportion of training data that contain left child data
        /// * `right_child_probability` - proportion of training data that contain right child data
        ///
        /// # Example:
        /// ```
        /// extern crate rsml;
        /// use rsml::tree::model::DecisionTree;
        /// fn main(){
        ///     let impurity = DecisionTree::gini_impurity(0.2, 1.0, 0.5);
        ///     let expected = 0.8 * 0.5;
        ///     assert!(impurity == expected);
        /// }
        /// ```
        pub fn gini_impurity(left_child_proportion: f64,
                               left_child_probability: f64,
                               right_child_probability: f64)
                               -> f64 {

            let right_child_proportion = 1.0 - left_child_proportion;

            let left_impurity = 1.0 - left_child_probability.powi(2) -
                                (1.0 - left_child_probability).powi(2);
            let right_impurity = 1.0 - right_child_probability.powi(2) -
                                 (1.0 - right_child_probability).powi(2);

            left_child_proportion * left_impurity + right_child_proportion * right_impurity
        }



        /// Build a decision tree on training data.
        /// # Arguments:
        ///
        /// * `X` - training data
        /// * `y` - target data
        /// * `indices` - indices of data subset fed to node
        /// * `depth` - current depth of tree


    pub fn build_tree(&mut self, train: &Mat<f64>, target: &Col<f64>, depth: usize) -> Node {


        let num_plus = target.iter().fold(0.0,|a, &b| a + b);
        let probability = num_plus as f64 / target.len() as f64;


        if probability == 0.0
            || probability == 1.0
            || depth > self.max_depth as usize
            || target.len() < self.min_samples_split as usize  {
                return Node::Leaf{probability: probability};
            }

            let mut best_feature_idx = 0;
            let mut best_feature_threshold = 0.0 as f64;
            let mut best_impurity = 1.0f64 / 0.0f64;
            for (feature_idx,feature) in train.outer_iter().enumerate(){
                let (threshold, impurity) = DecisionTree::find_optimal_split(feature, &target);

                if impurity < best_impurity  {
                    best_feature_idx = feature_idx;
                    best_feature_threshold = threshold;
                    best_impurity = impurity;
                }


        }
            let best_feature = train.column(best_feature_idx);
            let (left_data_idx, right_data_idx) = DecisionTree::split(best_feature, best_feature_threshold);
            if left_data_idx.len() > 0 && right_data_idx.len() > 0 {
                    let left_train = left_data_idx.iter()
                                        .map(|&x| train.row(x).into_shape((1,train.shape()[1]))
                                        .ok().unwrap()).collect::<Vec<_>>();
                    let left_train = stack(Axis(0), left_train.as_slice()).ok().unwrap();
                    let left_target = RcArray::from_vec(left_data_idx
                                                .iter().cloned().collect::<Vec<_>>()
                                                .iter().map(|&x| target[x]).collect::<Vec<_>>());

                    let right_train = right_data_idx.iter()
                                        .map(|&x| train.row(x).into_shape((1,train.shape()[1]))
                                        .ok().unwrap()).collect::<Vec<_>>();
                    let right_train = stack(Axis(0), right_train.as_slice()).ok().unwrap();
                    let right_target = RcArray::from_vec(right_data_idx
                                                    .iter().cloned().collect::<Vec<_>>()
                                                    .iter().map(|&x| target[x]).collect::<Vec<_>>());


                    let left = self.build_tree(&left_train.to_shared(),
                                                &left_target.to_shared(),
                                                depth + 1);
                    let right = self.build_tree(&right_train.to_shared(),
                                                &right_target.to_shared(),
                                                depth + 1);
                    return Node::Internal {feature: best_feature_idx,
                                           threshold: best_feature_threshold,
                                           children: Box::new((left,
                                                           right))}

            }


        Node::Leaf {probability: probability}

    }


        /// Traverse tree to retreive terminal classification probability on new data.
        /// # Arguments:
        ///
        /// * `X` - test data
        /// * `y` - target data
        /// * `row_idx` - row index of test sample in test data
        pub fn query_tree(&self, node: &Node, test: &Mat<f64>, row_idx: usize) -> f64 {
           match node {
               &Node::Internal {feature,
                                threshold,
                                ref children} => {
                   match test.get((row_idx, feature)).unwrap() <= &threshold {
                       true => self.query_tree(&children.0, test, row_idx),
                       false => self.query_tree(&children.1, test, row_idx),
                   }
               }
               &Node::Leaf {probability} => probability,
           }
       }


}

impl SupervisedLearning<Mat<f64>, Col<f64>> for DecisionTree{


    fn fit(&mut self, train : &Mat<f64>, target : &Col<f64>)  {
        let n_features = train.shape()[1];
        let n_outputs = target.shape()[0];

        let mut target_cloned = target.iter().cloned().collect::<Vec<f64>>();
        target_cloned.sort_by(|a, b| a.partial_cmp(&b).unwrap());
        target_cloned.dedup();

        let classes = RcArray::from_vec(target_cloned);

        let n_classes = classes.shape()[0];


        let max_depth = 15;


        let min_samples_split = 2;



        self.max_depth =max_depth;
        self.min_samples_split =min_samples_split;
        self.n_features=n_features;
        self.n_outputs=n_outputs;
        self.classes=classes;
        self.n_classes=n_classes;

        self.root= Some(self.build_tree(&train, &target, 1));
}


    fn predict(&mut self, test : &Mat<f64>) -> Result<Col<f64>, &'static str>{
        match self.root {
            Some(ref node) => {
                let mut data = Vec::with_capacity(test.shape()[0]);
                for row_idx in 0..test.shape()[0] {
                    data.push(self.query_tree(&node, &test, row_idx));
                }
                Ok(RcArray::from_vec(data))
            }
            None => Err("Tree must be built before predicting"),
        }
    }



}
