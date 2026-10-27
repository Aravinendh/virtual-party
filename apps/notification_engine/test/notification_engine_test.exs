defmodule NotificationEngineTest do
  use ExUnit.Case
  doctest NotificationEngine

  test "greets the world" do
    assert NotificationEngine.hello() == :world
  end
end
