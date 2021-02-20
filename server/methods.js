const users = [];

module.exports = {
    addUser : ({id,name,room})=>{
        name = name.trim().toLowerCase();
        room = room.trim().toLowerCase();

        const existingUser = users.find((user)=>user.name === name && user.room === room);
        if(existingUser){
            return {error : "Username is already taken"};
        }

        const user = {id,name,room};
        users.push(user);
        return {user};
    },

    getUser : (id)=>{
        return users.find((user)=>user.id === id);
    },

    getUserInRoom : (room)=>{
        return users.filter((user)=>user.room === room);
    },

    removeUser : (id)=>{
        const index = users.findIndex((user)=>user.id === id);
        if(index !== -1){
            return users.splice(index,1)[0];
        }
    }
}