"use client";
import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import Divider from "@mui/material/Divider";
import Share from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import {
  SearchBarPaper,
  CoverBackgroundCard,
  CoverCardMedia,
  ProfilePicAvatar,
  ArtistNameBox,
  NoOfFollowersBox,
  ArtistDetailBox,
  PostFeed,
} from "../../styles/fanclub.styles";
import {
  JoinClubButton,
  ChatButton,
  NavigationBox,
  PostCard,
  PostPublishAvatar,
  PublisherNameBox,
  PublishedDateBox,
} from "../../styles/fanclub.styles";
import {
  DescriptionBox,
  PostImageCard,
  NoOfLikesBox,
  NoOfCommentsBox,
  ProfilePicDiv,
  FindMorebutton,
} from "../../styles/fanclub.styles";
import { Stack } from "@mui/material";

export default function CustomizedInputBase() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div
      style={{
        backgroundColor: "black",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SearchBarPaper>
          <IconButton sx={{ p: "10px" }} aria-label="menu"></IconButton>
          <InputBase
            sx={{
              marginLeft: 1,
              flex: 1,
              textAlign: "center",
              color: "9A9A9A",
            }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="button" aria-label="search">
            <SearchIcon />
          </IconButton>
        </SearchBarPaper>
      </div>
      <CoverBackgroundCard>
        {/* <div style={{ padding: "6px", height: "100%" }}> */}
        <CoverCardMedia
          image={
            "https://png.pngtree.com/background/20230527/original/pngtree-purple-sound-waves-on-the-dark-background-picture-image_2754403.jpg"
          }
        ></CoverCardMedia>

        <ProfilePicDiv>
          <ProfilePicAvatar
            src={
              "data:image/jpeg;base64,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"
            }
          ></ProfilePicAvatar>
        </ProfilePicDiv>

        <ArtistDetailBox>
          <Stack width="60%">
            <ArtistNameBox>Avishka Weeraddana</ArtistNameBox>
            <NoOfFollowersBox>
              <i>2.5K Followers</i>
            </NoOfFollowersBox>
          </Stack>

          <Stack direction="row" spacing={1}>
            <JoinClubButton variant="contained" disableElevation>
              Join Club
            </JoinClubButton>

            <ChatButton variant="contained" disableElevation>
              Chat
            </ChatButton>
          </Stack>
        </ArtistDetailBox>
        {/* </div> */}
      </CoverBackgroundCard>

      <NavigationBox>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Post" />
          <Tab label="Videos"/> 
          <Tab label="Photos" />
          <Tab label="Events" />
          <Tab label="Contests" />
        </Tabs>
        
      </NavigationBox>
      
      <PostFeed>
        <PostCard>
          <Stack
            direction="row"
            sx={{
              width: "100%",
              padding: "1em",
              display: "flex",
              alignItems: "center",
            }}
          >
            <PostPublishAvatar
              src={
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgSEhUSFRgZGBgYGBIYGBIREhEaGRgZGhgYGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjEkISE0NDE0NDQ0NDQxNDQ0NDQ0NDQ0MTE0NDQ0NDQ0MTQ0PzQ/NDQxPz80PzQxMTE0MTQxNP/AABEIARMAtwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYHAgj/xAA7EAABAgQEBAMHAwIGAwEAAAABAAIDBBEhBRIxQQZRYXEigZEyobHB0eHwE0JScvEjYoKSosIVM0MU/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAIDAQQF/8QAIREAAwEAAwEBAAMBAQAAAAAAAAECEQMhMRJBEyJRMmH/2gAMAwEAAhEDEQA/AOUhKkCVMaCEIQAKbLyxNtLEucdGjmT+apqWglzgAKkmwpXSi07MO8QhtFSCKm1CQcovvStBtWp5KdVg8zouD4eDZjajUkjS+tPgtBBhhtMlSB/KpcOttu3NMRyIbRDh3oOZBJ3cTvqnpAB7gCKOGrakA2vlI3HL05Lmpt9nRKS6PeVwOa7a7XcDuaaU5+9XUhBzZXCmzXjL/tcRbaxO9905LSIc3Kbjrq0/5qajqOVVKksOfDrkdYXaHUcW70PMdUn0PhTY9J5HONXDw5mgV0vQHzBbVMS1A2tqm7joCdHH1r+BWPEL6MLYgAP7CL7AkV6hp13HULARcYcTlDg7o3TNetOQBNvXdVS1dE9z06FKhjhRwDvSvkpD+Hw+roZLczaO0cHciQfaosVhmNHNTK/KKXbenUCi32C4jWzX5ju02cO4+iRrH2bmrows7gjmOMJzL+0YY0AP/wBILjtvTTUHmqaNKOhvyOHY3GYbG+nZdqm8PZMNo6zhdrxZ7DzB5/FZLGsEJGSIAHCzIgHhd/E02PbqOSp9NekmjKYay6vGssqyQgOY4scKEGhGvoeWiumiylb7LR4VE+yyoojVpJ9tlQxmqkPojfpTTQUJgup02FCZqrrwmTWaISt0SLBykQhAVSQtE/CgE306/RJAZUgeifDybjtSlQPolbNSLfAIFD+oQfBXK213Ea20pr5dVcQZxrBVoBeTUnUDUN+qz0u42aNBr3/KKdC57e4qVLX2VVYsRLEY+04kk3vqSvbMSDHVrlcBYX8Xbl9QqmZmCPF6dOqq3zR/kfgFnxpqrDaO42eyuZpDqWcLXrqQdD87quneN5hwsWg7RAPF0BCyrnnoV7gSpcbA/JMuKUD5afSLqPxTFityRLgi9Pzz/CqIvIrT1+KvZPAHOuQR5J2dwMjQIVSniBzVLsz0Kbc32XEeZWlwTimKxwq5r+jrH/d91QzGHluoPoob4JGn3TOZoVOpZ9BcN4+yPRt2PpeG72j22cPwrRzEq17crgDbuvm/CcXeyjWuoQatdoWEcuQ2p1qu48FcStmoeV1BEaKObu6n7h56qXznTGrtfSKHGZHI8gijm3Dv5sr76X7X2UVq3+N4YIzLUD23Y7ry7Gyw8zCLTRwoRYg1r0+nkVG5+R+OtKue0VDHC0E42yophuqeBL9KOcUBmqsJ1QGaq68Jk5miVDQhYOUKVIF6AViI4wqQw3tvttVRWlTpZm/L4/nxSs1EyCz9vqpzW7KJBt3VixlGqbKSijxN+w/sAq1jSTZWWKNuANT8ArHB8MFiVrpTJsw6ohyGFOfSoK2OE4I1tCRdTJGVa3QBW0FoC5qts6VClCQ5UAJImHg2opjCnmpcN+jMT+Cgg2WMxTCS01AXWYrKhUGKSAcDZNNuWDlUjk0VhB5ELScLYs+FEZEYaOBA6dj0OnpyTGN4cW1IVNJRcj76GxHNdPVSc2fFd+H0/hk82NDa9ujhpuOY9ajyVVxBhmYGIBca9R9vks5wBitP8NxqDfWt7AnzsfVb97czaaqS/tOP0Kn4r/w5dNst5/3WfmmrdcQ4YRWIwVB1G460WJmxqkjp4bT3szk8FAhi6sZ/dV8PVdC8JE5uiErQhYMUC9IDV6DVUme4Tb0U9th296jy7E6XVPQfFKzUifJtqan+5Vs1lqKvkWaeqs2mx6CnqpV6VlFBPXijoAtDhRsFmXOrEcf8xWjws6LL8K8RpZZT4agSpVixc5ZjrCn4ajZl7ZGWp4ZhMLVGmINQvExiTGNLoj2sA3JA/uszO8ZZzklmV2zuBJPZoW/P0KngY5I1BsudYjAyuW+dGm3Nq8NcD+0tDfesjjUM1OZpaeR+qrxdPDOVbOmm4LmyWtdW4Ir0prVdjwyZzsB30PcLg/A0ej3QzvR1O1iux4FFp4fzp7qeiRv55BKX1xp/4TsbhUZnAJA9sC5y7kdrHyXPcekQQ6IygIu5o0eNns5jmNl1VpqFj8YlTBdlJpCeSGONCIbnfsINRlOnoE1LHqIy96OQz41VbC1Wn4uk2w3jKzJUXaCSyvNlbgHWlSszDF1WXq0xrGT2oStCEGlI0L00IATsJqoyaHWCgRD1AXlztl7lBU1SNjouJVSi+kMnm5RIDtvyy8TMWkMf6ikXbKeIrJa7j3+a0uHiix0GYcD4deeqnsjTJ0JHkAtqdNisN/LxqKZDmuq50yZmRq8+ZCtZDEHg0eaqFRn6dE1v4bb9RVmK4g5g8Ouyfw5+fRPYhI0FSLqa6ZToxUWXfFdmiud2rf7K0kmsZaHlB9XH5qvxWYLTS4r5E9B9VVxRGByh5aPCQGZiDvWo1OqvMukTqlHeaaiPiL28/QhUuKxc4vqoIgRgzMXvBrZjr+HmQbi6nQJJ5ZV9PIWR8qWH8n0swrcCj/pzDHaAnKfP70XZMKi2BGoXE5uGWuNLEEEdxddV4YnA+Gxw/c0Hsdx7ik5vyhOPxydBlI2YV9eh3CWflGRGGHEaHNcCCPpyVdJRcpB/a7XoeauQbKk19Sc9T8s5fxTg7yz9J5zZK/px6EkDUNeOXXz3XNXQXMdleKH1B6g7rvnEEiXDOxxY9lS1wu14pdjxuOu1lzrFZeBGP6cRjYEwC7IaUhx96dC6xBRL+Xn4DxrTKMQvb4RaS1wIcLFps4dwlVNAoQngaJoL042Ttk0I53vU2XFB2UGHcqWXLGPJOlna9j6lMYi+jacgB6p2W9lQsSdanP7pZ9GfhFln5TVS/wDyNPz4Kvodk5KMFTnGop27JqSfoTVJYixbNZiA3OSSALMvWu3dOw4hLsjgQ7kRlKk4fBqQQHOIpQmgApoaDdWwkDSpAqegUm5RWfr9JXC80Q/KVtpiGHNB5rn0g7JGbRdDlomZgUqRQz2K4KHnMGtrSmalSAqxuBP/AJD/AJBbgNCadCCE3gaZmV4cAu66mR8OAbortrKKPNvtRLTGlt9HLcflsrz5fE/VXHA2I5SIbudR51qPO58kxxQy5P5qqCQjFjw4Egg1trY/avcBWS+ownX9b07vJP8A2nQ+iupR9qHUWWO4enxHhBzSM7dRtXp0Oo7rTScetHeThuFKG5eMTknUTJiHmFNAdDplKwXFOEuP+GQ1wcXFjdKnUhhNs1q5DSoqRQgroTqU6HVVmMSrXwyxwJFRocr20NQWu2INDX4Ktf6Rn05QcUbT9KaZ+u0Wa/2Y7KbZ9SNqFCb4jgvZEo+hde9A3OK+0RseY5oQkmhmjDAoe5eQV4JqVfCfhIlwnQ6pTQNAnoApdYxkT2GgUCe1Hf5FSnOoFGmRYHr8isRtDUsypor6Qw0GhIVHIuuPzdavDYosp8jaLcUpouJKUa0WAT8eHZECJZeouig2X+TPwntbFBdsVuJGdY1v8rLneJ1DnZaVpYaKTg808gNfUVBDqHSo2KZp5piS8OiQpkPBIseS9Nes9w/gb4B8ERzmOOajjUtrsFpHQeSXP8MeIQvUCbepcSyrpopKKQkY3iM1r2WWa+jgfVa7GodarJTAo4Dv+fnRdPF4Q5vdNTwziLoTwQbGxFaAjl3Go811WTmWuAe01BHiHMcx1HJcWwx9CB0W+4fnXNo0m2oPL8+alydPTZX1J0aXfUU1+fJEYGhpqNOR6KBIxgadfwhTnPt+flFSa+pOepxnPeI8JaalrXFpObLUktJNLG5BFKEcqai7RXnFRaxoiuFq0LgP1KVpSrDZw+BodkKWsp0fP7jZENenMskau458HWqRCO6jN5KSw0SsdDsZ23mURx4R3/6lNPdqn3CrAeo+BCw30rmPyv7q/kY9Fn5pu/mp0jGqEXOobirHhsZWZU79WyzUtGVk2PZczk696GJuAHuqVPw4wWMLYjqHaxNFUzk1SwVd/wDrDnZczR3IH4U3y2jYUrtm9leImMAYakD9yuZTGIUSzXiv8TYntzXLxLvcP8PO49Rlb6nXyqrKQwaPTM57GHUAZlnzi9H+JrxM6FFeCoEwxRMNlorBWI/PXYCgHJWDrhRomv69GdxGBUFYXFG0iALo2ItsVznEn5pig2Cvwk+bwnyopkPdbKRFgR+EafRZOTZ7A6FbLDG1bTv9vfRT5h+I1eFRszbd+xCu2vq0HfQrKYU/K6nl+ea0kI1Hce8JOOvwTlkjTrmlpZEFWmm2YWPLuEKJjESlD0+aEN9ifKOAMOy8br00IIXoHN6KxOuNky3VPOFljNQjip0K7KKA47/l1OlfZQzZIk2yx6FMyMShp5qwjMrUcx8lTuJa6vK6F2sMbx6aOA5TYT1VScUOAIVhDco0sOqXqGJ+C7NmqKe9PYc+Ew2aATqdz5p5wqKJ2XkKrHXRSXj0lf8Akmj2QPzqpki+JFcNaeakYdgjPaiX6bLUyohtFGgBTeFK5qzojwYJAuiIKBSYsYLP4zizWNJJ+6TNeIlv6V3EeINYw35rASlXvc86n5/YKXik0+K7M7TZvL7pcLh0vyv9F0xPzJC6+qLeVb4x0t6LX4IBpqshJak91qcNfTKfzVQ5fDo4y8cMrwRvQ9ufwK0cufzyWdjPBoemvmVopBtQO30UeP8A6M5PCg4oBLQGmnM+YKEnG0i/KXQ6kktty5oVGuySfRw5qULy1e2r0GjklnsQ72TxhUFPMKRKQ6kK4j4fVmYahSdYWU6Zl7dFMlrNTUdlDT8sn4Y8CZ+Crpj72fnkqOeZR1ea0Dxv294VPiLLHoQfI/3RL7MtdEKVmiw8xuPoryVnGu0PluFnEAp6j6EnkcmyhxgrCWmgFipaceLE176+qtYEySoVGHVPImblmJNy6ph2NU3WXa93NOBpUvlFdLuZx91KNVDMvc85nmvwCeaxDmLViMfZUzDFKgMygN8yh7Lr3C5lV3olnZMl3Ur0+6tMFm8wc07XHzVIXeB3Mgn4KwwKDfqpWlhWH2bOTeXABa3DjlZVZbBIYzX9VqWGgooR1Wm8vawpuNcYbDhClySBRCy/HrXZ28tkK6W9kfOjlgK9grwF6C7DkL/BoWa62EGVqyioOGYFWArYy7LLlp9nXPhz3GpXI8jzHwKjw7Nb3+RWj4qlfZd1p6i3vos402Z3/wCp+apL1C1OMmQ/YB6D/iSFVTrb9xT1FverKTdVpH8XOHkfEPmoU23fp7wU0+iV4UNF5KfjNvVeHNVdInlhuraScqhWUi7RJa6KcT7LqEFJYxR4CnMC5mdqFYxeY7bKSxqbmG2Spm4VMRLC57BJHSywqKe/mqrwi12SZWEXvIArY28wr/DsPeMx0IOm9OSiYJAIiF2opSmlKclp35QP1PZ59VDkrvCszi0TDnuz000WulYlaLIYVNsLgcwuUuKcWMgO/Th+M702SSn9G21g9x3DDC2I4VabdQUizPEHEkSZDWuaGhvvQrqWc30c9anGNqQBvZNtV3w1JF8TNSob6VXTTxEJWvDX8PSZawVGwWgYyibloWVo7L06JTWy5GzrlFNxKwFh6EH3hYl5pT+v41+q2mNxMzHDoViHmxHIg+hVOPwzkQ7LPo97edx3b9qpJluv5SqZmSQ8PGoIPuCemXUIcLtdt8QqkSpjw9bXG2/VRgraJDDhUX+IUCJAI6+4+idMnUkQhTpEqI5t1JkrFbXaCP8Aov5YqewqulyprHLkaO6X0T4YXp8Oq8wDZSmhTbHRWuw+qfgYWBsrFjFMhMR9MzEQ4MqW6VC8z0tHewhgLgNWj2j2G6vIUNWMgGtcCRusTaZldrDlExMPHhBLaHS4IO9eSjQ3EmpNTzXZuIOFZeeaXtywowForRWtBYRG/vG3Mc9lyzFcBjyj8kdhAJ8EQeKG/wDpfpXobrplprTkbe4xkIShC0DOwIZe4Mbq4gDzXUcCw5kJjWtGmp3J3JWF4Ylc0TOdG2HddLlm2CXlrXhvFOLSWwJmZaKKQwWUOfiUBUcKyzPYq4AEA6rGRXjO4c6q74gxEMBO5sAsf+qSc1bq/HLwTkteFy8ZqjoPgF4a+xYf7FRYE1e6cmHila9iPmqJE9GnTABobEd6+RSOmgeTu9nKHEiZtdefNeGFN8oT6JDivcuPEmgpEoyrwFj8GRcwBZSA9KyFQJuJZQfZ1ItZV1lMhqLKQ6NClwG3U2h0ybCYpcMLxBZZPNCVoNJENSGuUaGnwswwlQpktNQaKwbiDHtMOMxr2OsWuAc09wVRvcqyexyFB/8AY8V8VGt8TiWi4PLldatXhjlNdk/EOBYEQ55SKYdf/m+sRg55TXMO1SOyFiMS4yivq2CTCbRvir466m420CFdKiLmf9JPDMlkYLX1Pda6XaqvDoVAFdQgpN69G8WDjjQKgxqZDWmvX3K7mH0C57xrP0bkBu+3+ke19PNNM7WGOvlaZLEpsxHl+2jRyH31URCF2JYcrevRQ4pS86LyhaYCAhAQBIgmppor7CpA5gSs2psjicSEfCaj+JuElS2uikUk+zaRoYAVa3xP6BQXcRZxR7COxRL4xDBBIf6BR+Gvw6P5Jf6ayCwkclJhMos0eK2AeFjz/tHzUeJxc/8AZDYOrnF3wol/joHyyv03cN6cMZrRVxA6mgHvXMY/Esy/94YL+y0D33VbHjveave539RLvcVq4G/WK+dfiOnzPFUrD/fnP8WDOfp71RznHzjaDBa0X8Tzmd0OUWHqsRVCrPDKJ1zUy5nOI5mJZ8V1PD4W+Bvh0NB1uqt0Uk1JJPMmpJ3JKaqiqdSl4I7b9Z6LkLyULcFOzSrFYNsFGgNT73UC4jrZEn4tAVyLiCa/UjvNahpyDy199V0XiOdyQ3v5NJ89vfRco73681bhn9JctfgIQhdBAEIQgASoQgBQhCEACVCEAKhCEAKlSIqgBUVSIQAqELySgAJQkKEAd1YE1MRLJwlV8/GoCuE7EYnjidqGwwfaOY9m/enoscrDHJr9SM91bA5W9hYn1qq9dcLJSOa62mKhCE4giVCVAAhCEACEIQAoSpEIAVCRKgBUIQgAQhCABeUpSIAChIhAHcIj1luKcQyQ3Ea6N7mw+vktDMxKBc34vnMzxDB9nxHudPdX1XJE/VHVdfMmdQgoXWcoqEoQUAIF6XkL0gBEJUiABCEIAVCRKgBUIQgBUIQgASIQUACRBQgBEIKEAddn9CuW4wf8Z/8AUhC5+D9L8viIRQhC6CB6CEIQAiVCEAKUiEIAChCEACVCEACUIQg0EIQgAKQoQgwQJEIQAFCEIA//2Q=="
              }
            />
            <Stack>
              <PublisherNameBox component="h3">
                Avishka Weeraddana
              </PublisherNameBox>
              <PublishedDateBox component="h3">2024-01-25</PublishedDateBox>
            </Stack>
          </Stack>

          <DescriptionBox>
            <p>
              Snow storm coming in Sommaroy island, Arctic Norway. This is
              something that you definitely wanna see in your life.
            </p>
          </DescriptionBox>

          <PostImageCard
            image={
              "https://images.unsplash.com/photo-1517147177326-b37599372b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2229&q=80"
            }
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "0 2em",
              mb: "1em",
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <IconButton
                sx={
                  {
                    //color: "#3B0764",
                  }
                }
              >
                <FavoriteBorderRounded />
              </IconButton>
              <NoOfLikesBox component="h3">Damidu and 12k others</NoOfLikesBox>
            </Stack>

            <NoOfCommentsBox component="h3">250 comments</NoOfCommentsBox>
          </Box>

          <Divider
            sx={{
              backgroundColor: "#9A9A9A",
              height: "2px",
              width: "90%",
              margin: "8px 0",
            }}
          />
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "0 2em",
              pb: "1em",
            }}
          >
            <IconButton>
              <FavoriteBorderRounded />
            </IconButton>

            <IconButton>
              <CommentIcon />
            </IconButton>

            <IconButton>
              <Share />
            </IconButton>
          </Stack>
        </PostCard>
      </PostFeed>

      <FindMorebutton color={"primary"} fullWidth>
        Find Out More <ChevronRightRounded />
      </FindMorebutton>
    </div>
  );
}

function Videos() {
  return (
    <div>
      <h2>Videos</h2>
    </div>
  );
}
