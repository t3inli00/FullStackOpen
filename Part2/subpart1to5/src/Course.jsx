/* eslint-disable react/prop-types */

const Course = ({ course }) => {
    return (
      <div>
        {course.map((c, index) => (
          <div key={index}>
            <h2>{c.name}</h2>
            {c.parts.map((e, inde) => (
              <p key={inde}>
                {e.name} {e.exercises}
              </p>
            ))}
            <div>
              Total of {c.parts.reduce((total, part) => total + part.exercises, 0)} exercises
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Course;
  