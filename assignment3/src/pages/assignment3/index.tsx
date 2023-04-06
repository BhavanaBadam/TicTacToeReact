import { Container, Stack, Box, Typography, List, ListItem } from "@mui/material";

const Assignment3 = () => {
  return (
    <Container sx={{ maxHeight: "100vh", overflowY: "scroll" }}>
      <Stack textAlign="center">
        <Typography variant="h2">Assignment 3</Typography>
        <Typography>
          The focus of this assignment is to get familiar with the methods and best practices when
          working on existing code. Most time you'll be modifying code rather than starting from
          scratch, so it is improtant to follow the code structure, styling, and tooling that's
          already in place. The new code you add should not look alien to other developers who'll be
          reviewing your code.
        </Typography>
      </Stack>
      <Stack mt={4} spacing={2}>
        <Typography variant="h4">Checkpoints</Typography>

        <Typography variant="h5">1) Look at existing code</Typography>
        <Typography>
          This app uses TypeScipt - it's a language built on top of JavaScript maintained by
          Microsoft. Typescript introduces some new things but the main point is to add type checks.
          In compiled languages like C++ you'll have to declare typres for variables (eg. int,
          float, String) which can be cumbersome but it makes code earier to read and prevents silly
          mistakes like assigning a string value to a int variable. TypeScript adds such checks to
          javaScript code. Get familiar with the syntax of TypeScipt - all code you write needs to
          be typed, and typed correctly.
        </Typography>
        <Typography>
          This app uses MUI, a react copmponent library, instead of implementing components on it's
          own. Using an existing library built by professional saves time, makes styling
          easier/consistent and reduces bugs. Whenever you want to add something, take a look at MUI
          to see if they already have a component for that. You shouldn't have to use the basic
          blocks like `div`, or `input` ever again.
        </Typography>
        <Typography>
          Look at the code structure. Common components(not many right now) are placed in
          `src/components` directory, Pages in `src/pages` etc. . Any new code you add should adhere
          to this structure. Anyone working with you should feel comfortable looking at your changes
          - it should not stick out as different.
        </Typography>

        <Typography variant="h5">2) Mutual Fund app</Typography>
        <Typography>
          There's a "Mutual Funds" link in the sidebar on the left that routes to the MF app. It
          currently has only the skeleton code to help you get started. Your task is to implement it
          completely.
        </Typography>
        <List
          sx={{
            listStyleType: "disc",
            "& .MuiListItem-root": {
              marginLeft: 2,
              display: "list-item",
            },
          }}
        >
          <ListItem>
            Hook the search bar to the search API (see `searchResults` in search.tsx). Right now it
            says "No results!" even before the user searches for anything - it shouldn't. Show some
            other message instead.
          </ListItem>
          <ListItem>
            "I'm feeling lucky" button should automatically open the 1st search result. Handle error
            cases as you deem fit
          </ListItem>
          <ListItem>
            The text field doesn't look quite like a search bar. Add a placeholder and search icon
            to it. See MUI documentation/examples for help
          </ListItem>
          <ListItem>
            When a search result is clicked it takes the user to the detail page where historical
            value of the fund is displayed. It shows dummy vales currently - hook it up with the
            actual API
          </ListItem>
          <ListItem>
            Showing historical values in the table is good, but it also helps to show additional
            details like % increase past month, past 6 months, 1 year etc. Add some more stats that
            would help decide whether to invest in the fund or not.
          </ListItem>
        </List>
        <Typography>Now for some final touches:</Typography>
        <List
          sx={{
            listStyleType: "disc",
            "& .MuiListItem-root": {
              marginLeft: 2,
              display: "list-item",
            },
          }}
        >
          <ListItem>
            Having to click "Search" button after typing is cumbersome. It should start searching
            automatically as the user starts typing. Look up the concepts "debounce" and "throttle"
            to help you do this efficiently.
          </ListItem>
          <ListItem>
            The MUI `Table` component used to display the historical values is very basic. Replace
            it with the powerful{" "}
            <a target="_black" href="https://mui.com/x/react-data-grid/">
              Data Grid component
            </a>
            .
          </ListItem>
        </List>

        <Typography variant="h5">3) SpaceX app</Typography>
        <Typography>Coming soon...</Typography>
      </Stack>
    </Container>
  );
};

export default Assignment3;
