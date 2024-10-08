import React from "react";

const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  );
};

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header courseName={course.name} />
          <Content parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
