import React, {Component} from 'react';

function Course(props) {
    return (
        <div className="course">
            <h3>Course: {props.course.name}</h3>
            <p>Duration: {props.course.duration}</p>
        </div>
    );
}

const Fee = (props) => (
    <div className="fee">
        <h4>Fee: {props.fee} </h4>
    </div>
);

class Student extends Component {
    render() {
        return (
            <div className='student-info'>
                <h2>Name: {this.props.student.name} </h2>
                <Course course={this.props.student.course} />
                <Fee fee={this.props.student.fee} />
            </div>
        )
    }
}

export default Student;