const express = require('express');

const app = express();
const port = 3000;

const people = [
  { user_id: '#1', name: 'Person 1', tickets: [] },
  { user_id: '#2', name: 'Person 2', tickets: [] },
  { user_id: '#3', name: 'Person 3', tickets: [] },
  { user_id: '#4', name: 'Person 4', tickets: [] },
  { user_id: '#5', name: 'Person 5', tickets: [] },
];

let roundrobinindex = 0;

app.use(express.json());


app.get('/',(req,res)=>{
  return res.send("Hello")
})


app.post('/ticket', (req, res) => {
  const { user_id, issue } = req.body;

  if (!user_id || !issue) {
    return res.status(400).json({ message: 'Missing user id or issue', success: false });
  }

  const assignedPerson = people[roundrobinindex];
  roundrobinindex = (roundrobinindex + 1) % people.length;
  
  assignedPerson.tickets.push({
    ticket_id: `#${assignedPerson.tickets.length + 1}`,
    issue,
    assigned_to: assignedPerson.user_id,
    raised_by: user_id,
  });


  res.status(201).json({
    message: 'Ticket created successfully',
    success: true,
    data: {
      ticket_id: assignedPerson.tickets.length,
      assigned_to: assignedPerson.user_id,
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
