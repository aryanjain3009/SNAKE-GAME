-module(snake).
-export([start/0]).

-define(ROWS, 10).
-define(COLS, 10).

-record(state, {
    snake,
    food,
    direction
}).

%% Entry point
start() ->
    InitialSnake = [{4,3}, {4,4}],
    Food = random_food(),
    State = #state{
        snake = InitialSnake,
        food = Food,
        direction = down
    },
    loop(State).

%% Main game loop
loop(State) ->
    timer:sleep(300),
    NewState = move(State),
    print(NewState),
    loop(NewState).

%% Move snake
move(State = #state{snake = [Head | _], direction = Dir, food = Food}) ->
    NewHead = next_head(Head, Dir),

    case NewHead of
        Food ->
            State#state{
                snake = [NewHead | State#state.snake],
                food = random_food()
            };
        _ ->
            TailRemoved = lists:sublist(State#state.snake, length(State#state.snake) - 1),
            State#state{
                snake = [NewHead | TailRemoved]
            }
    end.

%% Calculate next head position
next_head({X,Y}, up)    -> {X-1, Y};
next_head({X,Y}, down)  -> {X+1, Y};
next_head({X,Y}, left)  -> {X, Y-1};
next_head({X,Y}, right) -> {X, Y+1}.

%% Random food position
random_food() ->
    {rand:uniform(?ROWS)-1, rand:uniform(?COLS)-1}.

%% Print board (terminal)
print(#state{snake = Snake, food = Food}) ->
    io:format("Snake: ~p Food: ~p~n", [Snake, Food]).
