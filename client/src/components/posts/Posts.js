import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 class="large text-primary">Posts</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome to the community!
      </p>
      <PostForm />
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const MapStateToProps = state => ({
  post: state.post
});

export default connect(MapStateToProps, { getPosts })(Posts);
