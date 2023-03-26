package pt.isel.ls.database.memory

import pt.isel.ls.domain.User
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class UserTests {

    @Test
    fun `test create user manually`() {
        val mem = TasksDataMem()

        val name = "Francisco"
        val email = "honorStudent@gmail.com"

        val user = User(0, name, email, "token")
        mem.users[0] = user

        assertEquals(mem.users[0]?.name, name)
        assertEquals(mem.users[0]?.email, email)
    }

    @Test
    fun `test create user`() {
        val mem = TasksDataMem()

        val name = "Luigi"
        val email = "honorStudent@gmail.com"

        val sut = mem.createUser(name, email)

        assertEquals(mem.users[0]?.name, name)
        assertEquals(mem.users[0]?.email, email)
        assertEquals(mem.users[0]?.id, sut.id)
        assertEquals(mem.users[0]?.token, sut.token)
    }

    @Test
    fun `test create user with repeated email throws EmailAlreadyExistsException`() {
        val mem = TasksDataMem()
        val name = "Luigi"
        val email = "honorStudent@gmail.com"

        mem.createUser(name, email)

        val msg = assertFailsWith<EmailAlreadyExistsException> {
            mem.createUser("Ricky", email)
        }

        assertEquals("A user with that email already exists", msg.description)
    }

    @Test
    fun `test get user details`() {
        val mem = TasksDataMem()

        val name = "Tweeny"
        val email = "honorStudent@gmail.com"

        val user = mem.createUser(name, email)
        val sut = mem.getUserDetails(user.id)

        assertEquals(name, sut.name)
        assertEquals(email, sut.email)

        assertFailsWith<UserNotFoundException> { mem.getUserDetails(10) }
    }

    @Test
    fun `test get user details throws UserNotFoundException for a not created user`() {
        val mem = TasksDataMem()

        val msg = assertFailsWith<UserNotFoundException> {
            mem.getUserDetails(-1)
        }

        assertEquals("A user with that id does not exist", msg.description)
    }
}
