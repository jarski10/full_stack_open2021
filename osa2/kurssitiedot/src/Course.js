import React from 'react'

const Course = ({ name, parts }) => {
    return (
        <div>
            <Header course={name} />
            <ul>
                {parts.map(parts =>
                    <Content key={parts.id} name={parts.name} exercises={parts.exercises} />
                )}
                <Total parts={parts} />
            </ul>

        </div>
    )
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part eka={props.name} toka={props.exercises} />
        </div>
    )
}

const Total = ({ parts }) => {
    let sum = parts.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.exercises
    }, 0)

    return (
        <div>
            <b>total of {sum} exercises</b>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.eka} {props.toka}</p>
        </div>
    )
}

export default Course