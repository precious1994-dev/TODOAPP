'use client';

import { useState } from 'react';
import { useTodoStore } from '@/store/todoStore';
import { Priority } from '@/types/todo';
import { format } from 'date-fns';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Checkbox,
  ButtonGroup,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Badge,
  IconButton,
  useToast,
  Tooltip,
  ScaleFade,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  Tag,
  TagLabel,
  TagLeftIcon,
  Icon,
} from '@chakra-ui/react';
import {
  DeleteIcon,
  AddIcon,
  CalendarIcon,
  ChevronDownIcon,
  CheckIcon,
  TimeIcon,
  StarIcon,
  ViewIcon,
  CheckCircleIcon,
  NotAllowedIcon,
  SettingsIcon,
} from '@chakra-ui/icons';

const priorityConfig = {
  low: { icon: TimeIcon, iconColor: 'blue.400', color: 'blue' },
  medium: { icon: StarIcon, iconColor: 'purple.400', color: 'purple' },
  high: { icon: CheckCircleIcon, iconColor: 'pink.400', color: 'pink' },
};

export default function Home() {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'createdAt'>('priority');

  const { addTodo, sortTodos } = useTodoStore();
  const toast = useToast();

  const bg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) {
      toast({
        title: 'Task Required',
        description: 'Please enter a task description',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    addTodo({
      title: newTask.trim(),
      completed: false,
      priority,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
    });

    toast({
      title: 'Task Added',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });

    setNewTask('');
    setPriority('medium');
    setDueDate('');
  };

  const sortedTodos = sortTodos(sortBy);
  const displayedTodos = sortedTodos.filter(todo => {
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} py={8}>
      <Container maxW="4xl">
        <VStack spacing={6} align="stretch">
          <Card bg={bg} shadow="sm" borderRadius="lg">
            <CardHeader pb={2}>
              <Heading size="lg" color={textColor} letterSpacing="tight">
                Task Manager
              </Heading>
            </CardHeader>
            <CardBody>
              <Box as="form" onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <InputGroup size="lg">
                    <InputLeftElement>
                      <AddIcon color="gray.400" />
                    </InputLeftElement>
                    <Input
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="Add a new task..."
                      variant="filled"
                      bg={hoverBg}
                      _hover={{ bg: hoverBg }}
                      _focus={{ bg: 'white', borderColor: 'purple.400' }}
                      pl={10}
                    />
                  </InputGroup>
                  <Flex gap={3} direction={['column', 'row']}>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        variant="outline"
                        flex={['auto', 1]}
                        borderColor={borderColor}
                      >
                        <Flex align="center" gap={2}>
                          <Box as={priorityConfig[priority].icon} color={priorityConfig[priority].iconColor} />
                          <Text>{priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</Text>
                        </Flex>
                      </MenuButton>
                      <Portal>
                        <MenuList>
                          {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                            <MenuItem
                              key={p}
                              onClick={() => setPriority(p)}
                              icon={<Box as={priorityConfig[p].icon} color={priorityConfig[p].iconColor} />}
                            >
                              {p.charAt(0).toUpperCase() + p.slice(1)} Priority
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Portal>
                    </Menu>
                    <InputGroup flex={['auto', 1]}>
                      <InputLeftElement>
                        <CalendarIcon color="gray.400" />
                      </InputLeftElement>
                      <Input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        variant="outline"
                        borderColor={borderColor}
                        pl={10}
                      />
                    </InputGroup>
                    <Button
                      type="submit"
                      colorScheme="purple"
                      px={8}
                      flex={['auto', 'none']}
                      leftIcon={<AddIcon />}
                    >
                      Add Task
                    </Button>
                  </Flex>
                </Stack>
              </Box>
            </CardBody>
          </Card>

          <Card bg={bg} shadow="sm" borderRadius="lg">
            <CardBody>
              <Stack spacing={6}>
                <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                  <ButtonGroup size="sm" variant="ghost" spacing={2}>
                    <Button
                      leftIcon={<ViewIcon />}
                      variant={filter === 'all' ? 'solid' : 'ghost'}
                      colorScheme="purple"
                      onClick={() => setFilter('all')}
                    >
                      All
                    </Button>
                    <Button
                      leftIcon={<TimeIcon />}
                      variant={filter === 'active' ? 'solid' : 'ghost'}
                      colorScheme="purple"
                      onClick={() => setFilter('active')}
                    >
                      Active
                    </Button>
                    <Button
                      leftIcon={<CheckIcon />}
                      variant={filter === 'completed' ? 'solid' : 'ghost'}
                      colorScheme="purple"
                      onClick={() => setFilter('completed')}
                    >
                      Completed
                    </Button>
                  </ButtonGroup>

                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      variant="ghost"
                      size="sm"
                      leftIcon={<SettingsIcon />}
                    >
                      Sort by
                    </MenuButton>
                    <Portal>
                      <MenuList>
                        <MenuItem icon={<StarIcon />} onClick={() => setSortBy('priority')}>
                          Priority
                        </MenuItem>
                        <MenuItem icon={<CalendarIcon />} onClick={() => setSortBy('dueDate')}>
                          Due Date
                        </MenuItem>
                        <MenuItem icon={<TimeIcon />} onClick={() => setSortBy('createdAt')}>
                          Created Date
                        </MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                </Flex>

                <Stack spacing={3}>
                  {displayedTodos.length === 0 ? (
                    <ScaleFade initialScale={0.9} in={true}>
                      <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        p={8}
                        borderWidth={2}
                        borderStyle="dashed"
                        borderColor={borderColor}
                        borderRadius="lg"
                      >
                        <NotAllowedIcon boxSize={8} color={mutedColor} mb={4} />
                        <Text color={mutedColor} fontSize="lg">
                          No tasks found
                        </Text>
                      </Flex>
                    </ScaleFade>
                  ) : (
                    displayedTodos.map((todo) => (
                      <ScaleFade key={todo.id} initialScale={0.9} in={true}>
                        <Card
                          variant="outline"
                          borderColor={borderColor}
                          bg={todo.completed ? hoverBg : bg}
                          _hover={{ shadow: 'sm' }}
                          transition="all 0.2s"
                        >
                          <CardBody>
                            <Flex align="center" gap={4}>
                              <Checkbox
                                isChecked={todo.completed}
                                onChange={() => useTodoStore.getState().toggleTodo(todo.id)}
                                colorScheme="purple"
                                size="lg"
                              />
                              <Stack flex={1} spacing={2}>
                                <Text
                                  fontSize="md"
                                  fontWeight="medium"
                                  textDecoration={todo.completed ? 'line-through' : 'none'}
                                  color={todo.completed ? mutedColor : textColor}
                                >
                                  {todo.title}
                                </Text>
                                <Flex gap={3} align="center">
                                  <Tag
                                    size="sm"
                                    variant="subtle"
                                    colorScheme={priorityConfig[todo.priority].color}
                                  >
                                    <TagLeftIcon as={priorityConfig[todo.priority].icon} />
                                    <TagLabel>{todo.priority}</TagLabel>
                                  </Tag>
                                  <Tag size="sm" variant="subtle">
                                    <TagLeftIcon as={CalendarIcon} />
                                    <TagLabel>{format(new Date(todo.dueDate), 'MMM d')}</TagLabel>
                                  </Tag>
                                </Flex>
                              </Stack>
                              <Tooltip label="Delete task" placement="top">
                                <IconButton
                                  aria-label="Delete task"
                                  icon={<DeleteIcon />}
                                  onClick={() => {
                                    useTodoStore.getState().deleteTodo(todo.id);
                                    toast({
                                      title: 'Task deleted',
                                      status: 'info',
                                      duration: 2000,
                                      isClosable: true,
                                      position: 'top-right',
                                    });
                                  }}
                                  size="sm"
                                  variant="ghost"
                                  colorScheme="red"
                                />
                              </Tooltip>
                            </Flex>
                          </CardBody>
                        </Card>
                      </ScaleFade>
                    ))
                  )}
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
}
