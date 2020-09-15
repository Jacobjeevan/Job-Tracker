# Some lessons learned from Jobtracker projects...

## Things I did wrong:

###### Not reading documentation first

I usually like to take a shotgun approach and just play around with the library, rather than reading documentation first. This was fine in university, but not an optimal strategy in a workplace (and I realized the amount of time that was wasted on debugging and figuring this out).

Curbing my own excitement and reading documentation first would have been a better approach, and would have saved a lot of time in testing.

###### Unnecessary complexity

This goes back to reading documentation - but more on doing research. I should have read up more on state management through React. Had I done that, I could have chosen a less complex library such as React query or SWR instead of using Redux (which was not necessary for this particular project).

A low priority goal is to go back and rewrite the code to use SWR instead (thus removing a lot of the complexity). This is a time consuming, and more so in a workplace.

###### Not taking a test first approach

Also refers back to the other two points. Since I had the time, I decided to just write and test manually (within the browser), rather than writing tests which would have been more economical in terms of time/effort (plus, makes it much easier for me to go back and add more features).

One of my current goals is prepare a tests collection for this project - and make it more usable for the future.

## Things I did right:

###### Planning ahead

Sketching out ideas of different parts of the system and how they were to integrate (at least initially). Some things changed for sure, as I learned more about Django and React.

**What I could have done better**

Jotting down ideas were a start, but wireframes probably would have been more useful. I had spent considerable amount of time testing out the UI and how it would function (and look). Wireframes would have reduced the time required for this.

###### MVP

Rather than waiting and adding more features, I took the MVP approach - getting to deployment fast with the most basic, usable webapp, then going back and adding more features.

**What I could have done better**

Unfortunately, I did not follow the MVP model for each component/sub-components within the app. This goes back to increased complexity and using React redux - I decided to add more features first (such as authentication and user alerts) at the same time, rather than focusing on finishing one first (i.e. complete user alerts -> deploy -> user authentication -> deploy). Had I done that, I probably would have recognized the unnecessary complexity introduced by Redux earlier and opted for something else.
