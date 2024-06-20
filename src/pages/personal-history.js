import React, { useCallback, useState } from "react";
import '../style/page/history.css'
import blog from "../pictures/blog.jpg"

const personalHistory = function () {

    const Blog = function () {
        return (
            <div className="single-blog">
                <div>Blog</div>
            </div>
        )
    }
    const blogGrid = [];

    for (let i = 0; i < 90; i++) {
        blogGrid.push(<Blog key={i}></Blog>)
    }

    return (
        <div className="history-layout">
            This is history
            <div className="grid-container">
                {blogGrid}
            </div>
        </div>
    );
};

export default personalHistory;
