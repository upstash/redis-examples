# Roadmap Voting App 
This example showcases how to use Redis as a data store in a Next.js project. Upstash is used as Serverless Redis database.

The example is a roadmap voting application where users can enter and vote for feature requests. It features the following:

- Users can add and upvote items (features in the roadmap), and enter their email addresses to be notified about the released items.
- The API records the ip-addresses of the voters, so it does not allow multiple votes on the same item from the same IP address.

## Demo
Upstash uses this  application to collect feedback about its roadmap. See
[https://roadmap.upstash.com](https://roadmap.upstash.com)
                                    
## Deploy Your Own
You can deploy Roadmap Voting App for your project/company clicking the below button:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fupstash%2Fserverless-tutorials%2Ftree%2Fmaster%2Froadmap-voting-demo&env=LOGO&envDescription=Enter%20URL%20for%20your%20project%2Fcompany%20logo&envLink=https%3A%2F%2Fdocs.upstash.com%2Fdocs%2Ftutorials%2Froadmap_voting_app&project-name=roadmap-voting&repo-name=roadmap-voting&demo-title=Roadmap%20Voting&demo-description=Roadmap%20Voting%20Page%20for%20Your%20Project&demo-url=https%3A%2F%2Froadmap.upstash.com&integration-ids=oac_V3R1GIpkoJorr6fqyiwdhl17)

## Configuration
The application uses [Upstash](https://upstash.com) (Serverless Redis Database) as its data storage. During deployment you will be asked to integrate Upstash. The integration dialog will help you create an Upstash database for free and link it to your Vercel project with the following steps:

### Deployment Steps
After clicking the deploy button, enter a name for your project. Then you will be asked to install Upstash integration.
<img src="./docs/s2.png" width="250" />

You can sign up/sign in the following dialog:
![signup](./docs/s3.png)

Create a free database:
![dbcreate](./docs/s4.png)

Select your database and the Vercel project:
![link](./docs/s5.png)

Click `COMPLETE ON VERCEL` button:
![link](./docs/s6.png)

Finish you deployment by choosing a repository to host the project. In the next step, set the URL of your project's logo:
![repo](./docs/s7.png | height = 100px)

Your Roadmap Voting Page should be ready:
![final](./docs/s8.png | height = 100px)


       
