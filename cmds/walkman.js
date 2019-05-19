module.exports.run = async (client, message, args) => {
    message.channel.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Persona 3 the Movie Meets \“Walkman\"",
        url: "https://myanimelist.net/anime/32735/Persona_3_the_Movie_Meets_%E2%80%9CWalkman%E2%80%9D",
        description: "A short commercial featuring Makoto Yuuki, the protagonist of the Persona 3 film series, wearing a set of Sony headphones and using a Walkman.",
        fields: [{
            name: "Review",
            value: "10/10"
          },
          {
            name: "Testimonial:",
            value: "Persona 3 the Movie Meets \"Walkman\" is the alternate ending I hoped to see from the Persona 3 films. It stands as an absolute masterpiece for the Persona 3 storyline... scratch that, it stands as a masterpiece for the Persona series in general. You never know where the plot is going to go, from the beginning to the end of this feature presentation. You instantly feel engrossed into the Walkman alternate storyline that ATLUS had wrote for this to take. Makoto's headphones taking their upgrade into Sony headphones also gives this a feel that this is something new."
          },
          {
            name: "Video",
            value: "https://youtu.be/MDOvKoIL-VQ"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: "https://personacentral.com/wp-content/uploads/2016/02/Persona-3-The-Movie-Collaboration.jpg",
          text: "© Example"
        },
        image: 
        {
            url: "https://personacentral.com/wp-content/uploads/2016/02/Persona-3-The-Movie-Collaboration.jpg"
        }
      }
    });
}
module.exports.help = {
    name: "walkman",
    description: "Gives you everything you need to know on the best thing in creation"
}