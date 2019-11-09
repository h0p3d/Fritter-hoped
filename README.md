# fritter-hoped
Build your own not-quite-Twitter!

A5 - Reflection
Total time - two all nighters and then some or 25 + hours
Current heroku deployment: https://hoped-fritter.herokuapp.com/
Moqup from A4: https://app.moqups.com/cRHGMYkKoU/view/page/ad64222d5
(Pretty similar, eh?)


# Design Reflection
## Interface Design - Gestalt Principles
- I decided to break up three main concepts into three separate columns that don't really interact with each other.
-Concept 1 - Following- users can add and remove their followers and who they are following in a compact left sidebar. I considered the right side bar but because a user logs in and out on the right side of the screen I figured it would be better to apply Gestalt principles and group most of the user account interfaces together.
-Concept 2 - Freets - The main concept of fritter is freets and so hence the freets take up center stage.
-Concept 3 - User account actions. I decided to handle log in and log out in the center of the screen where it is likely easy to catch the user's, especially new user's attention. I also wanted to separate the ideas of logging in and out from actively modifying a users account. However, this comes at the cost of increasing the path distance between the log in/out button and the corresponding interface.

## Interface Design - Undo and Cancel
In order to avoid as much user error as possible, I tried to offer two step verification to various permanent changes. Deleting an account, removing a follower and deleting a freet are all permanent actions that require additional user consent. While this increases the amount of time it would take for user to complete the actions (as opposed to just clicking the delete button), I thought it was worth it to avoid the potential pitfall of a user accidentally deleting their entire account with one click.

## Fitt's law
In order to make interactions as quick as possible, I chose to create a mini navigation bar for each concept described above so that users could quickly toggle on and off the interfaces instead of endlessly scrolling through them. Grouping buttons with similar functions together like create/edit/delete user and providing toggling for interfaces drastically reduces the distance the mouse needs to travel and makes it less likely that the user will accidentally click the wrong button on the way. The alternative of displaying the interfaces in a fixed vertical fashion might result in faster load times and more uniform appearance (my site currently has a bit of a problem with the columns shifting sizes and buttons moving) but I thought the simpler user interface and shorter mouse travel distances made the sacrifice woth it.

## Error Handling / Messages
In order to help the user make as few errors as possible, I tried to obfuscate as many of the buttons as possible that the user could not access, especially for the core concept of freets. When a user is logged in, they only can access freets by clicking the view all or searching a user directly in the nav bar which avoids the possibility of them trying to access a freet feed which doesn't exist or trying to create a freet before htey log in. 

Another example is in the way the sign in / sign out button is a single button that changes based on whether the user is logged in so they couldn't try to log out without signiing in. I think this adds to simplicity and clarity of the interface and removes possibly distracting buttons.

Instead of having a single location for feedback to be given to the user (success/failure of actions), I chose to have three have separate error / success messages displayed for each column. The messages disappear after five seconds which sometimes creates abrupt changes in the UI but for the most part helps the interface stay clean while providing the user non-intrusive feedback. I figured using alerts to convey errors would quickly become annoying to experienced users, but simply having it flash on the screen for five seconds means there is a possibility the user could miss the message.

## Refreeting and Voting
My final example is that I decided to keep my concept of refreeting and voting the same as in A3. A user can refreet and vote on posts that are not their own (in order to avoid self promotion). To emphasize this, the upvote, downvote, and refreet buttons are hidden on posts that belong to the user and all freet interaction buttons are hidden when a user isn't logged in. This reinforces the concept of a user account as a way to engage with the community and prevents users from overly self-promoting themselves. If I included all the buttons all the time the user would quickly become confused as to what interaction was available when.

# Ethical Reflection
-- A4 made me aware of color blindness. Instead of using a lot of different colors to convey messages, I tried to use gray scale and indicate changes in things like voting by changing the size of the buttons instead of the color. When a user upvotes, the up button grows in size. When the user undos the upvote, the button returns to the smaller size.

-- A4 and user testing made me realize the importance of clarity in conveying meaning. Someone who has never used Fritter before might be quickly confused by unfamiliar symbols on my moqup in A4 (it took me forever to understand what the retweet symbol on actual twitter meant.) So instead of using symbols, and to be aware of visually impaired people, I used large text for all of my buttons. To be aware of text to speech, I also limited the interfaces present by introducing the toggle switches. However, solely relying on text makes it much harder for a non-native English or non-literate person to navigate. 

--I think the emphasis on Accessibility at the cost of performance was worth it in the end. After running Google's audit my site scored 86 for accessibility but only 54 for performance (the cost of using v-if to regenerate templates each time a button is pressed). I think that the lack of performance would cause the site to not scale well, which is definitely something that should be considered for future development. Having reliable, secure and fast channels of communication need to be balanced with accessibility and ease of use.












A4 Reflection
# wireframing-hoped A4 		Wireframe a design for Fritter		Hope Dargan
Wireframe Link: https://app.moqups.com/cRHGMYkKoU/view 
Heuristic Evaluation
Use Fitts’s Law -- The main bar horizontal bar of buttons (Your Feed, All Freets, Your Freets) is an example of Fitt's law -- it uses a combination of very wide buttons and short distance between the buttons to make it extremely easy to toggle between different views of freets which is one of the main points of the site. 
Speak the user’s language -- wherever possible I tried to use familiar symbols (instead of words since not all users can speak English). For example the upvote, downvote and unfollow buttons are simple and widely used symbols that users should be familiar with. In hindsight, the refreet button might also have been turned into a symbol.
Consistent naming & icons -- the main format is consistent throughout the pages (except the user sidebar - I ran out of symbol space). Reused  upvote and downvote symbol on all pages. Reused x symbol, yes / no buttons to remove a follower / someone you are following. In hindsight could have used cancel button instead of no button for more consistency with cancelling a refreet.
Information scent -- this is one area where I could improve. It is not clear what refreeting or what going to the feed will do until users are familiar with what happens when you click the buttons. This is because users may be unfamiliar with the terms. To clear that up I could add an information button that would provide information about the action if the user hovered over it.
Follow conventions -- Page layout follows conventions. Search bar and user info at the top, side information on the right and the main information (freets) takes center stage. Also uses dark shading to indicate what page the user is currently on. I forgot to include a make freet button which would have been useful, especially on the your freet page...
Show location & structure -- Button locations are consistent with context of part of screen. Buttons that affect following status are exclusively in followers side bar. Buttons that affect freets are located on the associated freet.
Accelerators -- future site should use autocomplete / user's previous search history to help accelerate common searches. Future site should also have setting to remove warning screens so that advanced users can unfollow / remove follower in once click.
Keep paths short -- upvoting and downvoting are made extremely easy - if you try to upvote and then downvote it automatically toggles and readjusts the counts and symbols so that you don't have to upvote, unupvote and then downvote (or vice versa).
Undo & cancel -- Users can cancel their decisions to refreet, remove a follower, and stop following someone before the action is made permanent.
Perceptual fusion -- all actions are practically instantaneous, bellow the .1s bar although this might not be sustained in actual implementation.
Gestalt principles of grouping -- user interactions are grouped together, freet interactions are grouped together.
Recognition vs recall -- uses X symbol instead of term like unfollow that user would have to recall meaning of. Site could benefit from more clear symbols. 
Anticipation & context -- the follow button disappears if Best User is already following User 1 (in anticipation that the user would be uninterested in following users they are already following).
 User Testing
Task: Refreeting: Refreet User 1's post.
		-- The user found the refreet button pretty easily but was confused when they couldn't modify the comment text. In the future I would modify that text box so the user could successfully type in it. This task took by far the longest to complete because of the confusion.
Task: Upvoting: Navigate to the feed and downvote User 1's post.
		-- The user was confused what the feed was. I should have specified "your feed" and feature where when you hover over the your feed button it explains that your feed consists of the freets of users you follow.
Task: Following: Unfollow User 1 and then follow them again.
		-- User very easily completed task. Was confused why search bar didn't work -- need to add typing ability.
Task: Following:  Remove User 1 as a follower.
		-- User easily completed task after finding the followers subsection. Maybe provide a toggle button between followers and following so that the relevant information appears closer to the top left corner and is therefore easier to find.
Ethical implications:
-Did you make cultural or other assumptions about your users that affect how they interact with Fritter?
-- Yes I assumed the users spoke English, were familiar with generic concepts like following, upvoting and downvoting. I also assumed the user was familiar with left to right, top to bottom reading / page design.
-Would an effective use of design heuristics to maximize engagement with Fritter be manipulative?
-- Yes making Fritter to maximize user engagement would require users getting addicted to using the site. Making it difficult to leave the site in general is unethical and limits user agency.
-How would you adjust your design if your only goal were to: get children addicted to Fritter? or make it hard for older people to use Fritter? or stop fake news spreading? or prevent harassment? How, if at all, do your answers to these questions inform how you would actually design Fritter?
-- children : use more symbols, colors, games and sounds and use less words. This would affect the front end design mostly.
-- harder for old people: use smaller symbols, less words, provide no explanation of site-- assuming older people are less familiar with social media making the site with less explanations would create a steeper learning curve and ward off engagement of elderly  users. Again this mostly affects the design of the front end.
-- stop fake news spreading: only allow links shared to be from reputable news sources or prevent link sharing, hire moderators that remove popular fake news items. Would require a design of a restrictive link sharing system at the backend, creator of moderator position.
-- prevent harassment: remove downvote button, add report user button, add flag freet button, hire moderators to ban accounts that are repeatedly flagged, allow users to permanently block agressive users. Have the option to make account and freets private. Would require adding back end design choices about reporting and moderation.
-You have the option to allow users to see which other users have upvoted a Freet. What forms of engagement between users (positive or negative) would be encouraged by allowing this?
--Positive: users can see what other users upvote them, encourages user to upvote them in turn (positive feedback loop). Downvoting can have the positive effect of allowing users to self-moderate freets. If a freet is unpopular theoretically the person that got the downvotes would get the message that what they said was not approved within the community. 
--Negative: users that don't get a lot of upvotes might feel discouraged, compare themselves to other users and ultimately post less. Users can also use the downvoting function to bully other users. Users that get downvotes might seek revenge by downvoting posts of users that downvote them.
-In A3, we asked about stakeholders who aren’t your immediate users. Identify a design choice you faced that would benefit or harm such a stakeholder, and explain how.
Advertisers are probably an obvious stakeholder in any social media setting (assuming the service is provided to free for users). Currently the site has no way to promote, rank or sponsor certain kinds of content or show ads on the sidebars. This would harm advertisers that would be willing to pay money for the advantage of promoting their content to users.
-What are the accessibility implications of your design for people with different abilities? 
-- Blind users would not be able to use the site easily. I tried to address colorblindness - In anticipation of colorblind users, when a user upvotes an item not only does it turn green and increase the counter, the icon itself grows bigger which would provide additional context for someone not able to distinguish the color change (same for downvoting).
-One of the heuristics is to “speak the user’s language.” In retrospect, assuming you followed this, can you identify what kind of user you had in mind? 
-- An English speaking user that is familiar with the internet and knows how to use a computer.














A3 - Reflection
Total time 9 hours

##A - Concept design models for each concept
##B - A design reflection that lists each significant design decision you made
##C - A social/ethical reflection that lists a series of design decisions that have social or ethical implications. 

##Concept: Upvoting
- A -- concept design model
Purpose:
Allow fritter community to show aggregate agreement / disagreement of other user's content

Structure:
Freets: list Freet; Freet: Object which contains author, content, and unique id; User: Object, current user logged in with unique username

Actions:
-upvote(username, id): Freets[id].upvotes += 1, User.upvoted += id  - upvote freet that is not authored by yourself, assuming User has not previously upvoted or downvoted Freets[id]
-downvote(id) -  Freets[id].downvotes += 1, User.downvoted += id  - downvote freet that is not authored by yourself once, assuming User has not previously upvoted or downvoted Freets[id]
-removeUpvote(id) - Freets[id].upvotes -= 1, User.upvotes -= id - assumes user upvoted freet id, remove that vote from freet and user like it never happened 
-removeDownvote(id) - Freets[id].downvotes -= 1, User.downvoted -= id - assumes user downvoted freet id, remove that vote from freet and user like it never happened 

Tactic:
-if id not in (Users[username].downvoted + Users[username].upvoted) ; user has not voted on freet id
-if id not in Freets ; freet has been deleted or necer existed

- B - design reflection
- How do freets track their votes?
 For ethical reasons(below), I decided to both let users Upvote and Downvote freets. Instead of just displaying an aggregate score of Upvotes-Downvotes, I chose to display anonymized numbers of upvotes and downvotes to all users. I did this to emphasize good content (because haters gonna hate) and soften the blow if a freet is unpopular (perhaps some people will agree). If the purpose of upvoting is to show the range of community opinion and who agrees / disagrees it makes less sense to obfuscate that by having an aggregate number.
 - What happens when users/freets are deleted?
  As opposed to not bothering with the upvotes of deleted users or freets, I decided it would be better to adjust the upvotes of freets to reflect only current active accounts / freets. So when a user deletes their account, all freets they voted on will have their votes taken away as if the user had never existed. This is useful in cases of moderation where a user is just downvoting everyone and is forcibly removed by admin. It is also useful to have votes reflect the opinion of only the active fritter community and not past users. However, votes not are not affected when user accounts or freets are edited. This could create some problems if a user completely changes their freet and still has the same community response reflected, but sense the main purpose of editing is to correct and not to change I think this makes the most sense.
- C - Social / ethical reflection
In order to prevent users from unfairly promoting themselves or others, I decided to let users only vote on other users and only vote once. Downvotes were also a tricky thing that I had to decide if I wanted to include. In some ways, they discourage people or could be used to bully people. In other ways, it is a useful way for a community to self-moderate. In the future, a feature can be added to hide content that reaches a certain downvote threshold to remove less savory material.

##Concept - Refreeting
- A -- concept design model
Purpose:
Allow fritter user to take a snapshot of another users freet, respond to its content, and share it with their followers and community

Structure:
Freets: list Freet; Freet: Object which contains author, content, and unique id; User: Object, current user logged in with unique username

Actions:
-refreet(id, content) - Freets += new Freet(User.username, content, Freets[id].copy()); create new freet containing another user's freet and aditional user content; content cannot be empty; cannot refreet self, can refreet other refreets;

Tactic:
-if id not in Freets ; freet does not exist, action aborted
-if Freets[id].author == User.username ; User is refreeting self which is prevented
-if delete(Freets[id]) or edit(Freets[id]); refreets containing Freets[id] remains unchanged due to copy
-if content.length == 0 or content.length>140: user is simply violating freet convention which is prevented

- B - design reflection
 -- Deciding how to display refreets.
   - instead of cutting refreets short to fit within 140 character limit, I let the entirety of the refreet remain visible.
   Because I also allowed refreets of refreets, this effectively allows users to create a conversation and for other users to 
   view. This however comes at the cost of increased nesting and I imagine at a certain point it becomes intractable to follow.
   I also decided to remove the time and upvotes / downvotes when displaying the refreet of the part of the message (as opposed to including them). While this makes less information available, showing just the message, user and id of the refreet allows the refreeter's comment to have more weight and get separate recognition, regardless of how popular the original freet. It also allows people that follow the user to track down the other user of the original freet and view the original message if they want. This makes sense so that users can find other users to follow by following refreets and seeing what other people say.
 -- What happens when original refreet is modified or deleted?
   As opposed to modifying or deleting all refreets when that happened, I decided to not mutate the refreet section of a freet 
   once made because I took the purpose of refreeting to directly quote another user. Comments that a user made in response
   to a direct quote could lose meaning if the message they are referring to is changed or removed.
- C - Social / ethical reflection
  I decided to not allow users to refreet themselves. While this restricts user freedom, I thought it ethical to encourage users to create new content and not just self-promote or spam users with the same information.


##Concept: Following
- A -- concept design model
Purpose:
Allows users to filter which user freets they see in their feed.

Structure:
Users: list of User Object, User: Object has many attributes including username, following & followers--both set of usernames, currentUser: User object logged in session

Actions:
-follow(username) - currentUser.following += username, Users[username].followers += currentUser.username; follow user implies other user gains follower; 
-removeFollower(username) -- currentUser.follower -= username, Users[username].following -= currentUser.username; remove someone from following, remove them from list of followers
-stopFollowing(username) -- currentUser.following -= username, Users[username].follower -= currentUser.username; stop following someone and they in turn cannot see you in their list of followers 

Tactics:
-if username in currentUser.following : cannot follow*username) someone more than once, can only stopFollowing(username)
-if username == currentUser.username: cannot follow/unfollow self ; action blocked
-Freets.filter(freet.author in currentUser.following); show all freets of people you follow
-currentUser.follower + currentUser.following; show what other usernames follow you, show users you follow
-if username in currentUser.followers : can removeFollowe(username)
- B - design reflection
  (nothing significant besides allowing users to see all the freets of all the people they follow in a feed)
- C - Social / ethical reflection
- I allow users to remove followers, which allows users to keep their accounts semi-private and avoid harassment. For even more security and privacy, options to make user accounts private, approve followers, and block people permanently should be added in future versions.

-Whenever a user follows or unfollows someone, I show the information of both affected users (for correctness' sake). To protect the details of the other user, I remove password and upvote information of the user not logged in for privacy and security.




























A2 - Reflection
Total time :11 hours. Yikes.

##A -- What ambiguities or omissions did you discover in the specification that needed to be resolved?
##B -- What design decisions did you make in regard to these, and other aspects of the behavior, and what was your rationale for them? What alternatives did you consider and why did you reject them?
##C -- For each of your design decisions: do they have ethical or social implications, and if so, what?

- 1) What is a valid username?
	A -- I determined that a username should be a non-empty string. B-- If an empty string could be used as a username it was prone to bugs. C-- allowing any other username has some ethical implications if users can pick anything they want they might do something hateful / malicious with their username. Also from a security standpoint I didn't consider strength of passwords and therefore the user accounts might be more vulnerable.
- 2) What happens to a session when a user logs in to another account?
	A --I determined to pretend like the user logged out and then started a new session as a new user so that only one user could be
	logged in at a time. 
	However, if a user attempts to log in but fails (while in another session), the system will pretend like nothing happened and 
	continue with the original session. I determined that this would be better than logging the user out in case the user forgot
	their password since there is no password recovery method as of yet. C -- No ethical / social implications besides helping users remember their changes?
- 3) What happens when the user updates the username?
	A -- I determined that the freets should still be tied to the user's account if the user changes names so I devised a method to update all the user's previous freets with the previous username. B-- as opposed to leaving the previous freets unchanged. C -- This makes sense on 2 levels - 1) a user should always get credit for the content they create, even if they change persona. Also from a security standpoint "shedding" freets each time a user changes names allows another person to claim that old username and therefore the ability to modify those freets.
-4) How important is security?
	A/B/C -- The passwords are stored in plaintext and the session key is in the file, with additional security measures this site could be made much more secure and protect user data. However, I took care to use closures with the representations of User and Freet objects so that they are only mutated through local variables where possible. There are serious ethical and social implications to publishing a website like this that can be used on the web. If my fritter service somehow became used in the real world I would be responsible for keeping user data safe from attack. However, this seems rather unlikely and we haven't learned how to secure the site so I decided leave that to future versions.
- 5) What happens when the user deletes their account?
	A -- I determined that like Twitter, when a user deleted their account their freets would also be deleted (B -- as opposed to remaining as a relic). This prevents someone from creating a new account with that name and gaining the ability to modify the freets (which would be super bad from an ethical and social standpoint). C -- This also allows the possibility for moderation of users - in the future I will add mod/admin privileges to grant certain users the ability to delete malicious accounts that violate fritter community norms.
6) What happens when the user changes their username or password?
	A - In this case I forced the user to log out and log back in instead of continuing a normal session with the updated information. This 	was rather arbitrary- they could have chosen to continue with the new information. B - But I decided that it might help the user remember their new password / username if they had to type it again while logging in which should help since there is no password / username recovery.
7) How to keep the list of freets?
	A - I stored a unique ID number and also a timestamp with each freet. The unique ID makes it easy to edit or delete a freet and also indicates if a freet is missing or deleted, which is useful for users trying to follow the order of things. I also included a timestamp (B - as opposed to nothing besides the id, user and message) so that when the freet message was updated the timestamp would also update. C - Since the freets ID will never change, updating the timestamp allows other users to see that a freet was edited. This is good from a social /ethical standpoint of keeping track of changes to the system to help prevent breaches or reverse damage. 
8) How to show all Freets?
	A- I also chose to represent Freet and user data separately since I think it is most convenient if Freets are displayed in chronological order (most recent to lest recent). B- As opposed to oldest to newest or by user order, the newest to oldest chronological order allows users the convenience of ease of following conversation.C- It also allows for separation of user account manipulation and freet manipulation for the most part which allowed for cleaner modules within the code. This is important for future Fritter employees and others looking at the code base.
